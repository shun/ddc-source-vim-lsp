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
  static readonly CMAX = 100;
  c = 0;
  async gatherCandidates(
    args: GatherCandidatesArguments<Params>,
  ): Promise<Candidate[]> {
    this.c++;
    if(this.c === Source.CMAX) this.c = 0;

    const lspservers: string[] = await args.denops.call(
      "lsp#get_allowed_servers",
      // deno-lint-ignore no-explicit-any
    ) as any;
    if (lspservers.length === 0) {
      return [];
    }

    const id = `source/${this.name}/${this.c}`;
    void args.denops.call("ddc_vim_lsp#request", lspservers[0], id);

    const items = await (args as any).onCallback(id, 2000);
    return items;
  }

  params(): Params {
    return {};
  }
}
