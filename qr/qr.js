window.addEventListener('DOMContentLoaded', function () {
    const string = "https://kazu-iroiro.github.io/QuRoko/viewer/viewer.html#" + decodeURI(location.hash.substring(1));

    var text = unescape(encodeURIComponent(string));

    $('#qrcode').qrcode({ text: text, width: 150, height: 150, correctLevel : 1});

    // canvas要素を非表示にする
    const canvas = document.querySelector('#qrcode canvas');
    canvas.style.display = 'none';

    // 新しいcanvasを作成してQRと画像を描画する
    const combinedCanvas = document.createElement('canvas');
    const combinedContext = combinedCanvas.getContext('2d');
    const img = document.getElementById('newImg');

    // 画像のサイズを小さくするためのパラメータ
    const logoWidthRatio = 0.25;  // 画像の幅を元の50%にする
    const logoHeightRatio = 0.25; // 画像の高さを元の50%にする

    // QRと画像の周りの余白
    const padding = 20;  // 余白のサイズ

    // QRの描画が完了した後に実行する
    setTimeout(() => {
        const qrCodeCanvas = document.querySelector('#qrcode canvas');
        const qrCodeWidth = qrCodeCanvas.width;
        const qrCodeHeight = qrCodeCanvas.height;
        
        // 新しいcanvasのサイズを設定
        const logo = new Image();
        logo.src = '../images/quroko.png';
        logo.onload = () => {
            const originalLogoWidth = logo.width;
            const originalLogoHeight = logo.height;
            const logoWidth = originalLogoWidth * logoWidthRatio;
            const logoHeight = originalLogoHeight * logoHeightRatio;

            combinedCanvas.width = qrCodeWidth + padding * 2;
            combinedCanvas.height = qrCodeHeight + logoHeight + padding * 3;

            // 背景を白に設定
            combinedContext.fillStyle = "#ffffff";
            combinedContext.fillRect(0, 0, combinedCanvas.width, combinedCanvas.height);

            // QRを描画
            combinedContext.drawImage(qrCodeCanvas, padding, padding);

            // QRの下に画像を描画
            combinedContext.drawImage(logo, (combinedCanvas.width - logoWidth) / 2, qrCodeHeight + padding * 2, logoWidth, logoHeight);

            // combinedCanvasを画像に変換
            const dataURL = combinedCanvas.toDataURL('image/png');
            
            // img要素にデータURLを設定
            img.src = dataURL;

            date = new Date()
            
            const imgDownloadName = "QuRoko_" + date.toLocaleString() + ".png";

            // ダウンロードリンクも設定
            const dlLink = document.getElementById('dlImg');
            dlLink.href = dataURL;
            dlLink.download = imgDownloadName;
        };
    }, 100);  // 1秒待つ
});
