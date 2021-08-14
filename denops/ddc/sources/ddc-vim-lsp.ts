import {
  BaseSource,
  Candidate,
  Context,
  DdcOptions,
  SourceOptions,
} from "https://deno.land/x/ddc_vim@v0.0.13/types.ts#^";

import {
  Denops,
} from "https://deno.land/x/ddc_vim@v0.0.13/deps.ts#^";

import {
  once
} from "https://deno.land/x/denops_std@v1.4.0/anonymous/mod.ts";

export class Source extends BaseSource {
  async gatherCandidates(
    denops: Denops,
    context: Context,
    _ddcOptions: DdcOptions,
    _sourceOptions: SourceOptions,
    _sourceParams: Record<string, unknown>,
    completeStr: string,
  ): Promise<Candidate[]> {
    return new Promise((resolve) => {
      denops.call("ddc_vim_lsp#request", denops.name, once(denops, (response) => {
        resolve(this.toCandidates(response));
      })[0])
    })
    .then((cs: Candidate[]) => {
      return cs;
    });
  }

  toCandidates(response: unknown[]): Candidate[] {
    const cs: Candidate[] = response.map((e) => {
	    return {word: e.label};
    });
    return cs;
  }
}
