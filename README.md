Untuk meng-custom atau men-develop ulang template,
pastikan sudah meng-install npm terlebih dahulu jika sudah, jalan kan perintah berikut:

1. npm install
2. gulp

jika terjadi error : primordials is not defined in node

lakukan langkah berikut:

pada folder yang sama dengan package.json buat file dengan nama npm-shrinkwrap.json. lalu masukan code d bawah pada file npm-shrinkwrap.json

{
  "dependencies": {
    "graceful-fs": {
        "version": "4.2.2"
     }
  }
}

lalu ulangi langkah 1 dan 2