import {
  BaseSource,
  Candidate,
} from "https://deno.land/x/ddc_vim@v0.13.0/types.ts#^";

import { batch, vars } from "https://deno.land/x/ddc_vim@v0.13.0/deps.ts#^";
import {
  GatherCandidatesArguments,
  OnInitArguments,
} from "https://deno.land/x/ddc_vim@v0.13.0/base/source.ts#^";

// Vim funcname constraints can be found at :help E124.
// Leading numbers are allowed in autoload name.
const escapeVimAutoloadName = (name: string) => {
  let escaped = "";
  for (let i = 0; i < name.length; i++) {
    if (name.charAt(i).match(/[a-zA-Z0-9]/)) escaped += name.charAt(i);
    else escaped += `_${name.charCodeAt(i)}_`;
  }
  return escaped;
};

const escapeVimAutoloadNameCache = new Map<string, string>();
const escapeVimAutoloadNameCached = (name: string) => {
  if (!escapeVimAutoloadNameCache.has(name)) {
    escapeVimAutoloadNameCache.set(name, escapeVimAutoloadName(name));
  }
  return escapeVimAutoloadNameCache.get(name);
};

// deno-lint-ignore ban-types
type Params = {};

export class Source extends BaseSource<Params> {
  async onInit(args: OnInitArguments<Params>): Promise<void> {
    const escaped = escapeVimAutoloadNameCached(this.name);
    await batch(args.denops, async (denops) => {
      await vars.g.set(
        denops,
        `ddc#source#ddc_vim_lsp#${escaped}#_results`,
        [],
      );
      await vars.g.set(
        denops,
        `ddc#source#ddc_vim_lsp#${escaped}#_requested`,
        false,
      );
      await vars.g.set(
        denops,
        `ddc#source#ddc_vim_lsp#${escaped}#_prev_input`,
        "",
      );
    });
  }

  async gatherCandidates(
    args: GatherCandidatesArguments<Params>,
  ): Promise<Candidate[]> {
    const escaped = escapeVimAutoloadNameCached(this.name);
    const prevInput = await vars.g.get(
      args.denops,
      `ddc#source#ddc_vim_lsp#${escaped}#_prev_input`,
    );
    const requested = await vars.g.get(
      args.denops,
      `ddc#source#ddc_vim_lsp#${escaped}#_requested`,
    );
    if (args.context.input == prevInput && requested) {
      return await vars.g.get(
        args.denops,
        `ddc#source#ddc_vim_lsp#${escaped}#_results`,
        // deno-lint-ignore no-explicit-any
      ) as any;
    }

    const lspservers: string[] = await args.denops.call(
      "lsp#get_allowed_servers",
      // deno-lint-ignore no-explicit-any
    ) as any;
    if (lspservers.length === 0) {
      return [];
    }

    await batch(args.denops, async (denops) => {
      await vars.g.set(
        denops,
        `ddc#source#ddc_vim_lsp#${escaped}#_results`,
        [],
      );
      await vars.g.set(
        denops,
        `ddc#source#ddc_vim_lsp#${escaped}#_requested`,
        false,
      );
      await vars.g.set(
        denops,
        `ddc#source#ddc_vim_lsp#${escaped}#_prev_input`,
        args.context.input,
      );

      // NOTE: choose first lsp server
      await denops.call("ddc_vim_lsp#request", lspservers[0], escaped);
    });

    return [];
  }

  params(): Params {
    return {};
  }
}
