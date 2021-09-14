import {
  BaseSource,
  Candidate,
} from "https://deno.land/x/ddc_vim@v0.6.0/types.ts#^";

import {
  batch,
  Denops,
  vars,
} from "https://deno.land/x/ddc_vim@v0.6.0/deps.ts#^";

export class Source extends BaseSource {
  async onInit(args: {
    denops: Denops,
  }): Promise<void> {
    await batch(args.denops, async (denops) => {
      vars.g.set(denops, "ddc#source#ddc_vim_lsp#_results", []);
      vars.g.set(denops, "ddc#source#ddc_vim_lsp#_requested", false);
      vars.g.set(denops, "ddc#source#ddc_vim_lsp#_prev_input", "");
    });
  }

  async gatherCandidates(args: {
    denops: Denops,
    context: Context,
    completeStr: string,
  }): Promise<Candidate[]> {
    const prevInput = await vars.g.get(args.denops, "ddc#source#ddc_vim_lsp#_prev_input");
    const requested = await vars.g.get(args.denops, "ddc#source#ddc_vim_lsp#_requested");
    if (args.context.input == prevInput && requested) {
      return await vars.g.get(args.denops, "ddc#source#ddc_vim_lsp#_results");
    }

    const lspservers = await args.denops.call("lsp#get_allowed_servers");
    if (lspservers.length === 0) {
      return [];
    }

    await batch(args.denops, async (denops) => {
      vars.g.set(denops, "ddc#source#ddc_vim_lsp#_results", []);
      vars.g.set(denops, "ddc#source#ddc_vim_lsp#_requested", false);
      vars.g.set(denops, "ddc#source#ddc_vim_lsp#_prev_input", args.context.input);

      // NOTE: choose first lsp server
      denops.call("ddc_vim_lsp#request", lspservers[0]);
    });

    return [];
  }
}
