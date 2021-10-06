import {
  BaseSource,
  Candidate,
} from "https://deno.land/x/ddc_vim@v0.13.0/types.ts#^";

import {
  GatherCandidatesArguments,
} from "https://deno.land/x/ddc_vim@v0.13.0/base/source.ts#^";

// deno-lint-ignore ban-types
type Params = {};

export class Source extends BaseSource<Params> {
  async gatherCandidates(
    args: GatherCandidatesArguments<Params>,
  ): Promise<Candidate[]> {
    const lspservers: string[] = await args.denops.call(
      "lsp#get_allowed_servers",
      // deno-lint-ignore no-explicit-any
    ) as any;
    if (lspservers.length === 0) {
      return [];
    }

    const id = `source/${this.name}`;
    void args.denops.call("ddc_vim_lsp#request", lspservers[0], id);

    const items = await (args as any).onCallback(id, 2000);
    return items;
  }

  params(): Params {
    return {};
  }
}
