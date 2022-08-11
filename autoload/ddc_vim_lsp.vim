function! ddc_vim_lsp#_callback(server, position, id, data) abort
  if lsp#client#is_error(a:data) || !has_key(a:data, 'response') || !has_key(a:data['response'], 'result')
    return
  endif

  let l:options = {
      \ 'server': a:server,
      \ 'position': a:position,
      \ 'response': a:data['response'],
      \ }
  let lspitems = lsp#omni#get_vim_completion_items(l:options)['items']
  let isIncomplete = (
        \   type(a:data['response']['result']) == 4
        \   && has_key(a:data['response']['result'], 'isIncomplete')
        \ ) ?
        \ a:data['response']['result']['isIncomplete'] : v:false

  call ddc#callback(a:id, {'items': lspitems, 'isIncomplete': isIncomplete})
endfunction

function! ddc_vim_lsp#request(server_name, id) abort
  let l:server = lsp#get_server_info(a:server_name)
  let l:position = lsp#get_position()

  call lsp#send_request(a:server_name, {
    \ 'method': 'textDocument/completion',
    \ 'params': {
    \   'textDocument': lsp#get_text_document_identifier(),
    \   'position': l:position,
    \ },
    \ 'on_notification': function('ddc_vim_lsp#_callback', [l:server, l:position, a:id]),
    \ })
endfunction


function! ddc_vim_lsp#get_completion_servers(ignoreCompleteProvider) abort
  let l:names = []
  for l:server_name in lsp#get_allowed_servers()
    let l:capabilities = lsp#get_server_capabilities(l:server_name)
    if a:ignoreCompleteProvider
      call add(l:names, l:server_name)
    else
      if has_key(l:capabilities, 'completionProvider')
        call add(l:names, l:server_name)
      endif
    endif
  endfor
  return l:names
endfunction
