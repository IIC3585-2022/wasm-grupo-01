EMCC=emcc

all: subset.cpp
	$(EMCC) -O3 -s WASM=1 -o wasmSubset.js -s EXPORTED_RUNTIME_METHODS='["getValue", "setValue"]' -s EXPORTED_FUNCTIONS="['_checkEqualSum', '_calloc', '_free']" -s EXPORT_ES6=1 -s MODULARIZE=1 subset.cpp
