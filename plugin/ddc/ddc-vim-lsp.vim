if exists('g:loaded_ddc_vim_lsp')
  finish
endif

let g:loaded_ddc_vim_lsp = 1

silent! call ddc#register_source({
			\ 'name': 'ddc-vim-lsp',
			\ 'path': printf('%s/denops/ddc/sources/ddc-vim-lsp.ts', fnamemodify(expand('<sfile>'), ':h:h:h')),
			\ })
