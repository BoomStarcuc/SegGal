/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

function setupCarousel(carouselContainer) {
  carouselContainer.querySelectorAll('.carousel-method-segment').forEach(segment => {
    segment.addEventListener('click', function() {
      const methodName = this.getAttribute('for');
      const carouselId = methodName.split('-')

      const imagePath = `./images/${methodName.toLowerCase()}-image.png`;
      const elementId = `selected-image-${carouselId[carouselId.length-1]}`;
      document.getElementById(elementId).src = imagePath;
      
      // Update the download link similarly if needed
      const downloadId = `download-link-${carouselId[carouselId.length-1]}`;
      const downloadLinkElement = document.getElementById(downloadId);
      downloadLinkElement.href = downloadLinks[methodName];
    });
  });
}

document.querySelectorAll('.work__image-box').forEach(setupCarousel);

const downloadLinks = {
  "Swin-S-tdn": "https://drive.google.com/file/d/1KcwbXTh1y1qwnDKGP-RJy8N2E5dpRBU3/view?usp=sharing",
  "Swin-T-tdn": "https://drive.google.com/file/d/1UOzbLDfHPGDJOohqz7XS16mDRKD6hYb8/view?usp=sharing",
  "Cellpose-tdn": "https://drive.google.com/drive/folders/1hrD134nuaNhgB33ovcSZUisWRvOJ-Bhf?usp=sharing", //need to update
  "Cascade Mask RCNN seesaw-tdn": "https://drive.google.com/file/d/1t9_jwJ56SO2RjOeV5e-J4UllWbpGweR3/view?usp=sharing",
  "Centermask2-tdn": "https://drive.google.com/file/d/1d7T8cd_O5kCWTOEvXhG3mm2H7stT19MB/view?usp=sharing",
  "SOLOv2-tdn": "https://drive.google.com/file/d/14W54MKOhy4gG9Bh1CCKUc-I0JUaghkg8/view?usp=sharing",
  "ResNeSt-tdn": "https://drive.google.com/file/d/12dqmnDqyxG94vNh9m26Fg2k8DSCDufdQ/view?usp=sharing",
  "Res2Net-tdn": "https://drive.google.com/file/d/1WGXfe38MczACb5dF6_yrsMTsHxs56j3J/view?usp=sharing",
  "RF-Next-tdn": "https://drive.google.com/file/d/1zGYx6ynlU4BGE1IjkpCDtP4StBEwXHBD/view?usp=sharing",
  "StarDist-tdn": "https://drive.google.com/file/d/1skZwknHJLz8I-rpMHYZee8dgVvrSHFI3/view?usp=sharing",
  "HRNet-tdn": "https://drive.google.com/file/d/10DsAVOlVIt1yAT_Wxeich-KrMzBK4g7i/view?usp=sharing",
  "Mask2former-tdn": "https://drive.google.com/file/d/1uFQRz4aKwDsUE3zOCyu5Y2zU_mS3E7mO/view?usp=sharing",
  "Mask RCNN-tdn": "dhttps://drive.google.com/file/d/18l64TKnxLM5IS0i_OQ30rDQP1pZhuxl9/view?usp=sharing",
  "Segment Anything-tdn": "https://drive.google.com/file/d/1xOEyH4XgxVzRcB3vZqCQ33lpRiuhNr99/view?usp=sharing",
  "RetinaMask-tdn": "https://drive.google.com/file/d/13XwVnyNz_7jNOlnaa_gMN0Y7WQl7GDit/view?usp=sharing",
  "Mesmer-tdn": "https://drive.google.com/file/d/1uMDEtZ3sFDAulIGrHdjgaTsi2ui1y7Y-/view?usp=sharing",
  "MS RCNN-tdn": "https://drive.google.com/file/d/1Tgcz471lVTmNnqtl7xnUh2ecRdBhaEvo/view?usp=sharing",
  "FeatureNet-tdn": "https://drive.google.com/drive/folders/1l8s0gOWGWDE9ocgNCt6-u98nQVWkq-1o?usp=sharing",
  "Swin-S-tnn": "https://drive.google.com/file/d/1pUO5e9SzWNSlE9ZZ_ig-vqO54TJ00uIj/view?usp=sharing",
  "Swin-T-tnn": "https://drive.google.com/file/d/1cLqLPEmnuILW7oj39FntdTgsjZc4LWz-/view?usp=sharing",
  "Cellpose-tnn": "https://drive.google.com/file/d/1HG-_kjZ4Tuw9Ow6y232okrxw5EHfI58U/view?usp=sharing",
  "Cascade Mask RCNN seesaw-tnn": "https://drive.google.com/file/d/1oRWTNJExub1nhEk4JjQOi-pQ-17xFcYE/view?usp=sharing",
  "Centermask2-tnn": "https://drive.google.com/file/d/1CN7f8H4MI1QgBC9OdATN8BIoB7jO4DA-/view?usp=sharing",
  "SOLOv2-tnn": "https://drive.google.com/file/d/1gAaen35dcF9D2Xf_LNf4BySz4K74xw4Q/view?usp=sharing",
  "ResNeSt-tnn": "https://drive.google.com/file/d/1eHknAdfk4vmxDTX3qUaT6RTK31r6Vjcn/view?usp=sharing",
  "Res2Net-tnn": "https://drive.google.com/file/d/11hy1yimjVLZN4Fj_TeMFyEmJr6ppxskj/view?usp=sharing",
  "RF-Next-tnn": "https://drive.google.com/file/d/1P6NDVlOAEunch_d1bgV6C8NcizGYB16E/view?usp=sharing",
  "StarDist-tnn": "https://drive.google.com/file/d/1Er78cjy6PQca833rUnjFkXmvOW3j4GXV/view?usp=sharing",
  "HRNet-tnn": "https://drive.google.com/file/d/1g7qnQVyaqLDJ3SuIk1wWhY3s4tnGY_Mu/view?usp=sharing",
  "Mask2former-tnn": "https://drive.google.com/file/d/1-OKgaE1PYRT22GozRDmlV_8ai-JVeyhQ/view?usp=sharing",
  "Mask RCNN-tnn": "https://drive.google.com/file/d/1B96YuCQSCLurjInRuBO0DjLUvhjWTV8c/view?usp=sharing",
  "Segment Anything-tnn": "https://drive.google.com/file/d/1E4NvrFeySzGjMoZrjjPOQWpE5y0yyFK3/view?usp=sharing",
  "RetinaMask-tnn": "https://drive.google.com/file/d/1VKN1EYjcvA1WoFPHN0EAvSMvDgvbSsmn/view?usp=sharing",
  "Mesmer-tnn": "https://drive.google.com/file/d/1wqMS9_HHXo3C5cJTBMbM5yU1ZJChlnVM/view?usp=sharing",
  "MS RCNN-tnn": "https://drive.google.com/file/d/1H23QjaWnMx1ED3DVPKFMtF_WvFPB2CL3/view?usp=sharing",
  "FeatureNet-tnn": "https://drive.google.com/drive/folders/1z-1umIWW7qEpkIw8X6koDxzHaBDfxPuV?usp=sharing",
  "Swin-S-tdw": "https://drive.google.com/file/d/1Vnq58-0zGixrwx18tSdxhPcvoM9IMKEr/view?usp=sharing",
  "Swin-T-tdw": "https://drive.google.com/file/d/1_VtJTwBKRWG91VaqSKLOOIoHMZn1ZKez/view?usp=sharing",
  "Cellpose-tdw": "https://drive.google.com/drive/folders/16hXHTHQEaduFxHAvCgtQbMHrx2wEWNek?usp=sharing",
  "Cascade Mask RCNN seesaw-tdw": "https://drive.google.com/file/d/1BzUv9B7gm9gvQh6aSfTr4x6kiDosYHHf/view?usp=sharing",
  "Centermask2-tdw": "https://drive.google.com/file/d/1n2SNsEBljuvum5nTag3c-4PIfM8WVsId/view?usp=sharing",
  "SOLOv2-tdw": "https://drive.google.com/file/d/1f1Y-tCOH2bv2evEq1nsGI_5vv_vYp11T/view?usp=sharing",
  "ResNeSt-tdw": "https://drive.google.com/file/d/1X-yFhLWCRjdcyVajgrXmHLvhiH5pbfoN/view?usp=sharing",
  "Res2Net-tdw": "https://drive.google.com/file/d/1Q5KeOynY94Y1gWooGXS2LHaibthqBNrZ/view?usp=sharing",
  "RF-Next-tdw": "https://drive.google.com/file/d/1QVzTgYNfTGWZ9Ljukr_NfM-rCrLJ0VCB/view?usp=sharing",
  "StarDist-tdw": "https://drive.google.com/file/d/16oTVbECgEzt6TCpNbck_WwwN5dKlPE4L/view?usp=sharing",
  "HRNet-tdw": "https://drive.google.com/file/d/17tqlr6LuEYvhEp2QYEt9VUIUuB9fhjoS/view?usp=sharing",
  "Mask2former-tdw": "https://drive.google.com/file/d/1janiw29wJf2CZ0OeM8wfrfWckuLXoXUB/view?usp=sharing",
  "Mask RCNN-tdw": "https://drive.google.com/file/d/1wZ1pIOWJDv24SaW1Pt46CHlC07HnwEEo/view?usp=sharing",
  "Segment Anything-tdw": "https://drive.google.com/file/d/1wPRfvJ-htRYoLBHKg9etGUfvf9hkJt2I/view?usp=sharing",
  "RetinaMask-tdw": "https://drive.google.com/file/d/1IgpVYwlUkSPtWJ7V7JgQRNNSpeCmpO5Q/view?usp=sharing",
  "Mesmer-tdw": "https://drive.google.com/file/d/1ANm2HVNoVpW8wpJGa1ykWa0SDjNDPZXE/view?usp=sharing",
  "MS RCNN-tdw": "https://drive.google.com/file/d/18ke9suhFZ02YPiORDrhcyiMacHF7ZACT/view?usp=sharing",
  "FeatureNet-tdw": "https://drive.google.com/drive/folders/18dZOe9DuTiMWYscmUW_HsL1B-2xhy9bE?usp=sharing",
  "Swin-S-tww": "https://drive.google.com/file/d/1jsJTma2j2wv_b10oYDu9Yp7tAziYr-3H/view?usp=sharing",
  "Swin-T-tww": "https://drive.google.com/file/d/1PMjBbs7Q8Ez0k6DwNPn8VhQJ29yev6tz/view?usp=sharing",
  "Cellpose-tww": "https://drive.google.com/file/d/1lG-QKvin3m6TTuHRR0qnucLsRfrhL7OF/view?usp=sharing",
  "Cascade Mask RCNN seesaw-tww": "https://drive.google.com/file/d/1D_iS_eJhufKOPnpZDEvktojwx5jbrKA8/view?usp=sharing",
  "Centermask2-tww": "https://drive.google.com/file/d/11_1z6zQau05SAoGW9aF9ySYsZM72PFzs/view?usp=sharing",
  "SOLOv2-tww": "https://drive.google.com/file/d/10yAH_i8JlryZ1aOwJm47ZO9zvoh3YWKC/view?usp=sharing",
  "ResNeSt-tww": "https://drive.google.com/file/d/1JbFlz4VNT7UlztecyA7UKpyVd-j1Bnpj/view?usp=sharing",
  "Res2Net-tww": "https://drive.google.com/file/d/1p4J1bBVGnj4WjK67VNmF_qZwOfaVd2gJ/view?usp=sharing",
  "RF-Next-tww": "https://drive.google.com/file/d/1vXRIEpHrE06KAH5_LPC5qhQJyA_q59y3/view?usp=sharing",
  "StarDist-tww": "https://drive.google.com/file/d/1tDHwDUZ1lw4eApjNqbU1TiN1ePHi7MaU/view?usp=sharing",
  "HRNet-tww": "https://drive.google.com/file/d/1o2jLYZOgGwNgDd3lXQTAyHnaL7DUew_-/view?usp=sharing",
  "Mask2former-tww": "https://drive.google.com/file/d/1ymO6exgmquj1ZAcsO9TifH5oas8gx9AM/view?usp=sharing",
  "Mask RCNN-tww": "https://drive.google.com/file/d/1lLJYm9gwAcWjoEk3zqSr4H_kRD8i5jaO/view?usp=sharing",
  "Segment Anything-tww": "https://drive.google.com/file/d/1NCL3rXGrpfmCLMTfgcl2MggnUoiwt6YX/view?usp=sharing",
  "RetinaMask-tww": "https://drive.google.com/file/d/1WIIDWuX2mW3vephJr-uqmwJh0oLebFWZ/view?usp=sharing",
  "Mesmer-tww": "https://drive.google.com/file/d/17ak0MzQBa1guqBh14hU4qAKqjF16Nmvh/view?usp=sharing",
  "MS RCNN-tww": "https://drive.google.com/file/d/1vfLjXDTGixq3DXoBOyyheRgJkoj9ei5g/view?usp=sharing",
  "FeatureNet-tww": "https://drive.google.com/drive/folders/1_0d-4Lv44pZ4MZDKAXG_bTK3GjCEQSER?usp=sharing",
  "Swin-S-lnn": "https://drive.google.com/file/d/1onDLW8UuZUbOAy_3ZoXOM1Ly1KB1h8sc/view?usp=sharing",
  "Swin-T-lnn": "https://drive.google.com/drive/folders/16koFHQTZE5HhV0QB3ULKLOFKtG7Pzyl5?usp=sharing",
  "Cellpose-lnn": "https://drive.google.com/file/d/1O6TcqApoDorge7ITQ1HcmB6aRNb8UR7z/view?usp=drive_link",
  "Cascade Mask RCNN seesaw-lnn": "https://drive.google.com/file/d/107JG2Jt98JzDiIHSw42cAxoqxnhnlZM3/view?usp=drive_link",
  "Centermask2-lnn": "https://drive.google.com/file/d/1yKrVEV4Airz6sHcwpBIPhE0fc7w9CQk7/view?usp=drive_link",
  "SOLOv2-lnn": "https://drive.google.com/file/d/1ArRHSnHhOZ1NiBCydrdnwQmATrAMJIzR/view?usp=drive_link",
  "ResNeSt-lnn": "https://drive.google.com/file/d/1tPsgfUmPYVxmcMMGNSyJQjEVdfepBuqP/view?usp=drive_link",
  "Res2Net-lnn": "https://drive.google.com/file/d/1bkmUsge-zW7_PP8qrKS9LvSMVOoz6Glf/view?usp=drive_link",
  "RF-Next-lnn": "https://drive.google.com/file/d/1iJBQ4NIHOdgLwDJ2MYThEQl88pe4sJiB/view?usp=drive_link",
  "StarDist-lnn": "https://drive.google.com/file/d/1Jyp_lBWPsHzw_Jh9wPvuJakJkz4a9r0T/view?usp=drive_link",
  "HRNet-lnn": "https://drive.google.com/file/d/17MV_8zNMIueOrjvTJTfg5HnKHpynprT8/view?usp=drive_link",
  "Mask2former-lnn": "https://drive.google.com/file/d/1UPPAYF4qRV5DopgljF8kad1j_Zk47Bgp/view?usp=drive_link",
  "Mask RCNN-lnn": "https://drive.google.com/file/d/14RXcdohLffYfLI0N8IcT6HtXhn7x7lgK/view?usp=drive_link",
  "Segment Anything-lnn": "https://drive.google.com/file/d/1zEdGghq3buVa6aSBnCZEEBm44n1bnN6l/view?usp=drive_link",
  "RetinaMask-lnn": "https://drive.google.com/file/d/1VQEjdY6XA5WKAZoGb-K9gAqYyFvY8x4o/view?usp=drive_link",
  "Mesmer-lnn": "https://drive.google.com/file/d/1BIYPN9fxXKFVT1BD1zX4_Xj_WIt0950B/view?usp=drive_link",
  "MS RCNN-lnn": "https://drive.google.com/file/d/19wDFucKmvqMHpV0A0nYElwbSt12FAfLN/view?usp=drive_link",
  "FeatureNet-lnn": "https://drive.google.com/drive/folders/1cx7v5fXq2za-0g9YOd-AgiMzZU5lh39q?usp=drive_link",
  "Breast-SwinS-ttdn": "https://drive.google.com/file/d/1YxmM8rlM4kNP8ondhSDlSc9_68gWb-wX/view?usp=sharing",
  "Pancreas-SwinS-ttdn": "https://drive.google.com/file/d/16xgRu1x9I964L7doJpxjE3cAz_ANqzXQ/view?usp=drive_link",
  "Lymph Node-SwinS-ttdn": "https://drive.google.com/file/d/1EhZZ6ElfmtadV9aQugk7WuMFy-H8bMZu/view?usp=drive_link",
  "Colon-SwinS-ttdn": "https://drive.google.com/file/d/1-jXYgdmxbpqpyZ16dvWm_mSR67_QME6P/view?usp=drive_link",
  "Epidermis-SwinS-ttdn": "https://drive.google.com/file/d/14dHw2HWSTi_9P_TxtNV_Py8hoLb6HZZI/view?usp=drive_link",
  "Esophagus-SwinS-ttdn": "https://drive.google.com/file/d/1MDfGSIV9wbMgUh9olOtV3bLzzLCZe-4U/view?usp=drive_link",
  "Lymph Node Metastasis-SwinS-ttdn": "https://drive.google.com/file/d/1I3x_tCqj6OmcberuEDOMU5hWdy27VM0O/view?usp=drive_link",
  "Tonsil-SwinS-ttdn": "https://drive.google.com/file/d/1XVdXyzXyqBLlwYBEn1WtNA7yXesVfdIT/view?usp=drive_link",
  "Lung-SwinS-ttdn": "https://drive.google.com/file/d/1LDTFcJIAZojW8hVBIPSmfOB7z4xuVCDM/view?usp=drive_link",
  "Spleen-SwinS-ttdn": "https://drive.google.com/file/d/1fNinRCRFOuzLnun9hUaXwxV8RoS2Yibm/view?usp=drive_link",
  "Colon-SwinS-ttnn": "https://drive.google.com/file/d/1LCIFseXL6U2MeO2s4P7dwMt7aN1_ZU1O/view?usp=drive_link",
  "Lymph Node-SwinS-ttnn": "https://drive.google.com/file/d/1PMzLOkM3bQM5CxMc5He2nStXGfEcuPZv/view?usp=drive_link",
  "Breast-SwinS-ttnn": "https://drive.google.com/file/d/1tkqJDjfVXgDwu9QupWFtOni9ApepoOPN/view?usp=drive_link",
  "Pancreas-SwinS-ttnn": "https://drive.google.com/file/d/1tkqJDjfVXgDwu9QupWFtOni9ApepoOPN/view?usp=drive_link",
  "Esophagus-SwinS-ttnn": "https://drive.google.com/file/d/1F5NHCMM6Jl6IsHfkfJ3wpiEYNM1SX0ey/view?usp=drive_link",
  "Epidermis-SwinS-ttnn": "https://drive.google.com/file/d/15EUZOYaPmbmu8rqAkp9UwzYPtHIFOvW9/view?usp=drive_link",
  "Tonsil-SwinS-ttnn": "https://drive.google.com/file/d/1_p0Vc8kUcpCFbFHTuN_HQ68gekGIZU9y/view?usp=drive_link",
  "Lymph Node Metastasis-SwinS-ttnn": "https://drive.google.com/file/d/16BVfS0tZnL-3fPcpemHAvAG6k0qZG78X/view?usp=drive_link",
  "Lung-SwinS-ttnn": "https://drive.google.com/file/d/1fwlN05EqlMbTuamvL02WacPsV6Mqute4/view?usp=drive_link",
  "Spleen-SwinS-ttnn": "https://drive.google.com/file/d/1oIXwkiNO-ULspD2wSPjnwuLWQWzr2eo8/view?usp=drive_link",
  "Breast-SwinS-ttdw": "https://drive.google.com/file/d/1Mo5eyw-8fVnKWEODkO2S7lC4EVXH439f/view?usp=sharing",
  "Colon-SwinS-ttdw": "https://drive.google.com/file/d/1Ccp0sakNeQdNfvRoBBz0BfWRkAoOt8Nb/view?usp=drive_link",
  "Pancreas-SwinS-ttdw": "https://drive.google.com/file/d/185VsG-n1nyBJf7je_zLGxhPxd8HmSUux/view?usp=drive_link",
  "Lymph Node-SwinS-ttdw": "https://drive.google.com/file/d/1bjpuGWRJAWpyevvrsf0h1s2cJP1bkh8B/view?usp=drive_link",
  "Esophagus-SwinS-ttdw": "https://drive.google.com/file/d/1Y8-ypF3S5a0b9BOHWj1KYQUt39iYKeed/view?usp=drive_link",
  "Epidermis-SwinS-ttdw": "https://drive.google.com/file/d/17vmz09yy2xL96zKt5jyNH1oKBv9yTUXI/view?usp=drive_link",
  "Tonsil-SwinS-ttdw": "https://drive.google.com/file/d/1wHGWg2v0_sdcQYQGqYgdZIEzRk-anEcz/view?usp=drive_link",
  "Lymph Node Metastasis-SwinS-ttdw": "https://drive.google.com/file/d/16Zdpp6K1tYOf2XkzTFDM7ycBTrDVGzlj/view?usp=drive_link",
  "Spleen-SwinS-ttdw": "https://drive.google.com/file/d/1Rz3F9Hso2UgjI34BFng63yQPW6xaHA2E/view?usp=drive_link",
  "Lung-SwinS-ttdw": "https://drive.google.com/file/d/1iGoqLap1dSZopTIYkTNy8vXI470Xoz8R/view?usp=drive_link",
  "Esophagus-SwinS-ttww": "https://drive.google.com/file/d/1Pu1C_K2BEGcOX-OhszlEeJaVI7ue_AEe/view?usp=sharing",
  "Breast-SwinS-ttww": "https://drive.google.com/file/d/17vIMM5NZdeaz9p034g5UDYBcuk1y08xi/view?usp=drive_link",
  "Epidermis-SwinS-ttww": "https://drive.google.com/file/d/1S3h9MLpoNnqYAMb2pM2QcvDt5i4Z1meg/view?usp=drive_link",
  "Lymph Node-SwinS-ttww": "https://drive.google.com/file/d/11mVtIqsw4604CqQjOX6E82oufqMpj-Rk/view?usp=drive_link",
  "Colon-SwinS-ttww": "https://drive.google.com/file/d/1i7aT1hZ-YYZsW0X4yTlnWavlUGkRUbld/view?usp=drive_link",
  "Tonsil-SwinS-ttww": "https://drive.google.com/file/d/1IP20D5RQze03B4Q_Uc3niNLUbjneRbe2/view?usp=drive_link",
  "Pancreas-SwinS-ttww": "https://drive.google.com/file/d/1nipxucRXEPGqzaljN06Ja086UK35LVBN/view?usp=drive_link",
  "Lymph Node Metastasis-SwinS-ttww": "https://drive.google.com/file/d/1HMhkqS5S5F2mRpCIf9JFM4VT9FG2cW1n/view?usp=drive_link",
  "Lung-SwinS-ttww": "https://drive.google.com/file/d/1JpiyOt0kEjlPP-8UGFGL1uh6M3xmLnGH/view?usp=drive_link",
  "Spleen-SwinS-ttww": "https://drive.google.com/file/d/1J_ANgU45Pll2VTHXZNoZZ1Fms_848AdC/view?usp=drive_link",
  "BT474-SwinS-ltnn": "https://drive.google.com/file/d/1SlKiIS6ba27CaEw_h5NGXHwU3Em5eSNG/view?usp=drive_link",
  "MCF7-SwinS-ltnn": "https://drive.google.com/file/d/1bq4zEkP6Dgm3nfPRzHZgyD5KTYw8rY5V/view?usp=drive_link",
  "A172-SwinS-ltnn": "https://drive.google.com/file/d/1Q1cf3DP6nvfd0GfLCiuf0NY09Wxl_1Nm/view?usp=drive_link",
  "Huh7-SwinS-ltnn": "https://drive.google.com/file/d/1hivY2dqRBKKl1HcHKG6Nf02gzauKzej1/view?usp=drive_link",
  "SKOV3-SwinS-ltnn": "https://drive.google.com/file/d/1FpiIyyEQ3a9sYagzqUu0LB7-25HDKeDg/view?usp=drive_link",
  "SkBr3-SwinS-ltnn": "https://drive.google.com/file/d/1M9_niyCZCsuh5PI39Xbi-LVOEDrvYuAC/view?usp=drive_link",
  "SHSY5Y-SwinS-ltnn": "https://drive.google.com/file/d/1hpwnvOZQYjQMqpleI7lg5KPLSmPfzXTO/view?usp=drive_link",
  "BV2-SwinS-ttnn": "https://drive.google.com/file/d/1Hu8U7BL0ZBIiP-WaRKiEb2D_ZvU3uOW7/view?usp=drive_link"
};

document.addEventListener("DOMContentLoaded", function() {
  // Select all carousel instances
  const carousels = document.querySelectorAll(".carousel-bar");

  carousels.forEach(carousel => {
      let isDown = false;
      let startX;
      let scrollLeft;

      carousel.addEventListener('mousedown', (e) => {
          isDown = true;
          carousel.classList.add('active');
          startX = e.pageX - carousel.offsetLeft;
          scrollLeft = carousel.scrollLeft;
      });
      carousel.addEventListener('mouseleave', () => {
          isDown = false;
          carousel.classList.remove('active');
      });
      carousel.addEventListener('mouseup', () => {
          isDown = false;
          carousel.classList.remove('active');
      });
      carousel.addEventListener('mousemove', (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - carousel.offsetLeft;
          const walk = (x - startX) * 3; //scroll-fast
          carousel.scrollLeft = scrollLeft - walk;
      });
  });
});





