electron-packager src/ ScreenshotsApp --platform=darwin,win32 --arch=all --overwrite

: "darwinはわかりづらすぎるのでフォルダ名変更"
mv ScreenshotsApp-darwin-x64/ ScreenshotsApp-Mac/

: "ライセンスの上書き"
cp -f AppLICENSE ScreenshotsApp-Mac/LICENSE
cp -f AppLICENSE ScreenshotsApp-win32-ia32/LICENSE
cp -f AppLICENSE ScreenshotsApp-win32-x64/LICENSE

: "余計なversionファイルを削除"
rm ScreenshotsApp-Mac/version
rm ScreenshotsApp-win32-ia32/version
rm ScreenshotsApp-win32-x64/version

: "zip圧縮"
zip -r9 ScreenshotsApp-Mac.zip ScreenshotsApp-Mac
zip -r9 ScreenshotsApp-win32-ia32.zip ScreenshotsApp-win32-ia32
zip -r9 ScreenshotsApp-win32-x64.zip ScreenshotsApp-win32-x64
