# Very crude CRUD (haha, get it?) app made with Deno and Vue.js

To start the project locally, you must have [Deno](https://deno.land/#installation) installed.  

Without hot-reload:  
`$ deno run --allow-read --allow-net ./app.ts`  
`$ deno run --allow-read --allow-net ./websocket.ts`  

With hot-reload (requires [denon](https://deno.land/x/denon@2.3.2#install)):  
`$ denon start`  
`$ denon ws`