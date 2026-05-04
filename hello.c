#include <stdio.h>
#include <string.h>
#include <lz4.h>

int main(void) {
    const char *src = "Hello from zig-c! This string will be compressed with lz4.";
    int src_len = (int)strlen(src) + 1;
    int max_dst = LZ4_compressBound(src_len);

    char compressed[256];
    char decompressed[256];

    int compressed_len = LZ4_compress_default(src, compressed, src_len, max_dst);
    printf("Original : %d bytes\n", src_len);
    printf("Compressed: %d bytes\n", compressed_len);

    LZ4_decompress_safe(compressed, decompressed, compressed_len, sizeof(decompressed));
    printf("Decompressed: %s\n", decompressed);

    return 0;
}
