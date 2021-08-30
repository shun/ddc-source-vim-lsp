function! ddc_vim_lsp#_callback(server, position, data) abort
  if lsp#client#is_error(a:data) || !has_key(a:data, 'response') || !has_key(a:data['response'], 'result')
    return
  endif

  let l:options = {
      \ 'server': a:server,
      \ 'position': a:position,
      \ 'response': a:data['response'],
      \ }
  let lspitems = lsp#omni#get_vim_completion_items(l:options)['items']
 
  if len(lspitems) > 0
    let g:ddc#source#ddc_vim_lsp#_results = lspitems
    let g:ddc#source#ddc_vim_lsp#_requested = v:true

    call ddc#refresh_candidates()
  endif
endfunction

function! ddc_vim_lsp#request(server_name) abort
  let l:server = lsp#get_server_info(a:server_name)
  let l:position = lsp#get_position()

  call lsp#send_request(a:server_name, {
    \ 'method': 'textDocument/completion',
    \ 'params': {
    \   'textDocument': lsp#get_text_document_identifier(),
    \   'position': l:position,
    \ },
    \ 'on_notification': function('ddc_vim_lsp#_callback', [l:server, l:position]),
    \ })
endfunction
