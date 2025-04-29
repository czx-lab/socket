#### protobuf-cli
```
npm i -g protobufjs-cli

pbjs -t static-module -w commonjs -o gateway.js gateway.proto

pbjs -t static-module -w es6 -o src/pb/hello.js src/proto/hello.proto

pbts -o gateway.d.ts gateway.js
```