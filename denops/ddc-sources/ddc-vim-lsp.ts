import {
  BaseSource,
  Candidate,
} from "https://deno.land/x/ddc_vim@v0.4.2/types.ts#^";

import {
  Denops,
} from "https://deno.land/x/ddc_vim@v0.4.2/deps.ts#^";

import {
  once
} from "https://deno.land/x/denops_std@v1.8.1/anonymous/mod.ts";

export class Source extends BaseSource {
  async gatherCandidates(args: {
    denops: Denops,
    context: Context,
    completeStr: string,
  }): Promise<Candidate[]> {

    const lspservers = await args.denops.call("lsp#get_allowed_servers");
    if (lspservers.length === 0) {
      return [];
    }

    return new Promise((resolve) => {
      // NOTE: choose first lsp server
      args.denops.call("ddc_vim_lsp#request", lspservers[0], args.denops.name, once(args.denops, (response) => {
        resolve(response);
      })[0])
    })
    .then((cs: Candidate[]) => {
      return cs;
    });
  }
}
