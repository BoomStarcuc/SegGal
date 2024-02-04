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


document.querySelector('.carousel-container').addEventListener('mousedown', function(e){
  // When the mouse is pressed down, record the starting X position
  let startX = e.pageX;
  let scrollStartX = this.scrollLeft;

  function onMouseMove(e) {
      // Calculate the distance the mouse has moved
      let dx = e.pageX - startX;
      // Reverse the direction of scroll
      this.scrollLeft = scrollStartX - dx;
  }

  // Add the event listener for mousemove
  this.addEventListener('mousemove', onMouseMove);

  // Remove the event listener when the mouse is released
  this.addEventListener('mouseup', function(){
      this.removeEventListener('mousemove', onMouseMove);
  });

  // Also remove the event listener if the mouse leaves the container
  this.addEventListener('mouseleave', function(){
      this.removeEventListener('mousemove', onMouseMove);
  });

});

function toggleSelected(event) {
  var target = event.target;
  var allLabels = target.parentNode.querySelectorAll('.carousel-label');
  allLabels.forEach(label => label.classList.remove('selected'));
  target.classList.add('selected');
}

// Add click event listener to each carousel label
document.querySelectorAll('.carousel-label').forEach(label => {
  label.addEventListener('click', toggleSelected);
});

document.addEventListener('DOMContentLoaded', (event) => {
  // 获取所有的选项行
  var optionRows = document.querySelectorAll('.option-row');

  // 为每个选项行添加点击事件
  optionRows.forEach(function(row) {
      row.addEventListener('click', function(event) {
          // 确保点击的是选项块
          if (event.target.classList.contains('option-block')) {
              // 移除当前行所有选项的选中状态
              var options = row.querySelectorAll('.option-block');
              // console.log('Selected options:', options);

              options.forEach(function(option) {
                  option.classList.remove('selected');
              });

              // 为点击的选项添加选中状态
              event.target.classList.add('selected');

              // 获取选中的选项的文本
              var selectedOption = event.target.textContent.trim();
              console.log('Selected selectedOption:', selectedOption);
              // 根据选中的选项更新其他选项的状态
              updateOptions(row.getAttribute('data-method'), selectedOption);
              
          }
      });
  });

  // 更新其他选项的函数
  function updateOptions(method, selectedOption) {
      // 根据选中的选项和行来决定如何更新其他选项
      // 例如，如果选中了 Image Type 下的 Light Microscopy
      console.log('Selected method:', method);
      if (method === 'Image Type' && selectedOption === 'Light Microscopy') {
          // 获取Segmentation Type行
          var segmentationTypeRow = document.querySelector('.option-row[data-method="Segmentation Type"]');
          // 获取Segmentation Type下的所有选项
          var segmentationOptions = segmentationTypeRow.querySelectorAll('.option-block');
          // console.log('Selected segmentationOptions:', segmentationOptions);

          segmentationOptions[0].classList.remove('selected');
          segmentationOptions[0].classList.add('disabled');
          segmentationOptions[0].style.pointerEvents = 'none'; // 禁用点击
          segmentationOptions[0].style.opacity = '0.5'; // 改变透明度表示禁用

          segmentationOptions[1].classList.add('selected');


          var imageChannelRow = document.querySelector('.option-row[data-method="Image Channel"]');
          // 获取Segmentation Type下的所有选项
          var imageChannelOptions = imageChannelRow.querySelectorAll('.option-block');
          // console.log('Selected imageChannelOptions:', imageChannelOptions);

          imageChannelOptions[0].classList.remove('selected');
          imageChannelOptions[0].classList.add('disabled');
          imageChannelOptions[0].style.pointerEvents = 'none'; // 禁用点击
          imageChannelOptions[0].style.opacity = '0.5'; // 改变透明度表示禁用

          imageChannelOptions[1].classList.add('selected');

      }

      if (method === 'Image Type' && selectedOption === 'Fluorescence') {
        // 获取Segmentation Type行
        var segmentationTypeRow = document.querySelector('.option-row[data-method="Segmentation Type"]');
        // 获取Segmentation Type下的所有选项
        var segmentationOptions = segmentationTypeRow.querySelectorAll('.option-block');
        // console.log('Selected segmentationOptions:', segmentationOptions);

        segmentationOptions.forEach(function(option) {
          option.classList.remove('disabled');
          // 恢复点击事件
          option.style.pointerEvents = 'auto';
          // 恢复透明度
          option.style.opacity = '1';
        });

        var imageChannelRow = document.querySelector('.option-row[data-method="Image Channel"]');
        // 获取Segmentation Type下的所有选项
        var imageChannelOptions = imageChannelRow.querySelectorAll('.option-block');
        // console.log('Selected imageChannelOptions:', imageChannelOptions);

        imageChannelOptions.forEach(function(option) {
          option.classList.remove('disabled');
          // 恢复点击事件
          option.style.pointerEvents = 'auto';
          // 恢复透明度
          option.style.opacity = '1';
        });

      }

      if (method === 'Training Strategy' && selectedOption === 'Trained on Single Type') {
        // 获取Segmentation Type行
        var methodCarousel  = document.querySelector('.option-row[data-method="Method"] .carousel-container');
        // console.log('Selected MethodRow:', methodCarousel);

        var methodLabels = methodCarousel.querySelectorAll('.carousel-label');
        // console.log('Selected methodLabels:', methodLabels);

        methodLabels.forEach(function(label) {
          // 检查label的ID是否为'Swin-S'
          if (label.id == 'Swin-S'){
            label.classList.add('selected');
          }
          
          if (label.id !== 'Swin-S') {
              // 如果不是'Swin-S'，则禁用该标签
              label.classList.remove('selected');
              label.classList.add('disabled');
              label.style.pointerEvents = 'none'; // 禁用点击
              label.style.opacity = '0.5'; // 改变透明度表示禁用
          }
        });
      }
      
      if (method === 'Training Strategy' && selectedOption === 'Trained on All Types') {
        // 获取Segmentation Type行
        var methodCarousel  = document.querySelector('.option-row[data-method="Method"] .carousel-container');
        // console.log('Selected MethodRow:', methodCarousel);

        var methodLabels = methodCarousel.querySelectorAll('.carousel-label');
        // console.log('Selected methodLabels:', methodLabels);

        methodLabels.forEach(function(label) {
          // 检查label的ID是否为'Swin-S'
          if (label.id !== 'Swin-S') {
              // 如果不是'Swin-S'，则禁用该标签
              label.classList.remove('disabled');
              label.style.pointerEvents = 'auto'; // 禁用点击
              label.style.opacity = '1'; // 改变透明度表示禁用
          }
        });
      }
  }
});

document.addEventListener('DOMContentLoaded', (event) => {
  // 查找所有的复制按钮并添加点击事件监听器
  document.querySelectorAll('.copy-btn').forEach(button => {
      button.addEventListener('click', function() {
          // 根据按钮获取对应的pre标签内容
          var content = this.previousElementSibling.textContent;
          // 执行复制操作
          navigator.clipboard.writeText(content).then(function() {
              console.log('Async: Copying to clipboard was successful!');
              // 反馈给用户已复制，比如通过改变按钮文本
              button.textContent = 'Copied!';
              setTimeout(() => button.textContent = 'Copy Link', 2000); // 2秒后恢复按钮原始文本
          }, function(err) {
              console.error('Async: Could not copy text: ', err);
          });
      });
  });
});

document.addEventListener('DOMContentLoaded', (event) => {
  // 监听.option-block元素的点击事件
  var optionBlocks = document.querySelectorAll('.option-block, .carousel-label');
  optionBlocks.forEach(function(block) {
      block.addEventListener('click', function() {
          // console.log('Selected block:', block);
          // 更新选项为selected状态
          updateSelected(block);
          // 更新命令行
          updateCommandRows();
      });
  });
});


function updateSelected(clickedBlock) {
  // 检查是否点击的是carousel-label，如果是，只移除carousel-labels的selected类
  if(clickedBlock.classList.contains('carousel-label')) {
      var carouselLabels = clickedBlock.closest('.carousel-slide').querySelectorAll('.carousel-label');
      // console.log('Selected carouselLabels:', carouselLabels);
      carouselLabels.forEach(function(label) {
          label.classList.remove('selected');
      });
  } else {
      // 如果不是carousel-label，按正常逻辑处理
      var siblings = clickedBlock.parentNode.querySelectorAll('.option-block');
      siblings.forEach(function(sib) {
          sib.classList.remove('selected');
      });
  }
  // 为被点击的选项添加selected类
  clickedBlock.classList.add('selected');
}

function updateCommandRows() {
  // 此处添加逻辑，根据选中的选项更新GitHub链接和预训练模型链接
  var selectedOptions = document.querySelectorAll('.option-block.selected, .carousel-label.selected');
  console.log('selectedOptions:', selectedOptions);
  var selectedValues = Array.from(selectedOptions).map(function(opt) { return opt.textContent.trim(); });
  console.log('selectedValues:', selectedValues);

  // 假定您有逻辑来决定基于选中的选项返回哪个命令和链接
  var githubLink = downloadLinks[selectedValues[0]][selectedValues[1]][selectedValues[2]][selectedValues[3]][selectedValues[4]]['GitHub']; // 根据选择更新这个链接
  var modelLink = downloadLinks[selectedValues[0]][selectedValues[1]][selectedValues[2]][selectedValues[3]][selectedValues[4]]['Pre-trained model']; // 根据选择更新这个链接
  var Usability = downloadLinks[selectedValues[0]][selectedValues[1]][selectedValues[2]][selectedValues[3]][selectedValues[4]]['Usability'];
  var Scalability = downloadLinks[selectedValues[0]][selectedValues[1]][selectedValues[2]][selectedValues[3]][selectedValues[4]]['Scalability'];
  var accuracy = downloadLinks[selectedValues[0]][selectedValues[1]][selectedValues[2]][selectedValues[3]][selectedValues[4]]['Accuracy'];
  var numRows = document.getElementsByClassName('numRows')[0];
  var numLines = numRows.getElementsByTagName('input')
  numLines[0].value = accuracy
  numLines[1].value = Usability
  numLines[2].value = Scalability
  // 获取两个command-row，并更新它们的内容
  var commandRows = document.querySelectorAll('.command-row pre');
  if (commandRows.length >= 2) {
      commandRows[0].textContent = githubLink;
      commandRows[1].textContent = modelLink;
  }
}

// 注意：这里的githubLink和modelLink应该根据实际逻辑来生成
const downloadLinks = {
  "Fluorescence": {
    "Cell Nuclei Segmentation": {
      "Dual Channel Image": {
        "Trained on All Types":{
          "Swin-S": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1KcwbXTh1y1qwnDKGP-RJy8N2E5dpRBU3/view?usp=sharing', 'Accuracy': '0.73', 'Usability': '', 'Scalability': ''},
          "Swin-T": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-t', 'Pre-trained model': 'https://drive.google.com/file/d/1UOzbLDfHPGDJOohqz7XS16mDRKD6hYb8/view?usp=sharing', 'Accuracy': '0.73', 'Usability': '', 'Scalability': ''},
          "Cellpose": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Cellpose_BM', 'Pre-trained model': 'https://drive.google.com/drive/folders/1hrD134nuaNhgB33ovcSZUisWRvOJ-Bhf?usp=sharing', 'Accuracy': '0.83', 'Usability': '', 'Scalability': ''},
          "Cascade Mask RCNN seesaw": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#cascade-mask-rcnn-seesaw', 'Pre-trained model': 'https://drive.google.com/file/d/1t9_jwJ56SO2RjOeV5e-J4UllWbpGweR3/view?usp=sharing', 'Accuracy': '0.73', 'Usability': '', 'Scalability': ''},
          "Centermask2": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Centermask2', 'Pre-trained model': 'https://drive.google.com/file/d/1d7T8cd_O5kCWTOEvXhG3mm2H7stT19MB/view?usp=sharing', 'Accuracy': '0.89', 'Usability': '', 'Scalability': ''},
          "SOLOv2": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#solov2', 'Pre-trained model': 'https://drive.google.com/file/d/14W54MKOhy4gG9Bh1CCKUc-I0JUaghkg8/view?usp=sharing', 'Accuracy': '0.71', 'Usability': '', 'Scalability': ''},
          "ResNeSt": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/ResNeSt', 'Pre-trained model': 'https://drive.google.com/file/d/12dqmnDqyxG94vNh9m26Fg2k8DSCDufdQ/view?usp=sharing', 'Accuracy': '0.88', 'Usability': '', 'Scalability': ''},
          "Res2Net": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#res2net', 'Pre-trained model': 'https://drive.google.com/file/d/1WGXfe38MczACb5dF6_yrsMTsHxs56j3J/view?usp=sharing', 'Accuracy': '0.50', 'Usability': '', 'Scalability': ''},
          "RF-Next": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#rf-next', 'Pre-trained model': 'https://drive.google.com/file/d/1zGYx6ynlU4BGE1IjkpCDtP4StBEwXHBD/view?usp=sharing', 'Accuracy': '0.50', 'Usability': '', 'Scalability': ''},
          "StarDist": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Stardist', 'Pre-trained model': 'https://drive.google.com/file/d/1skZwknHJLz8I-rpMHYZee8dgVvrSHFI3/view?usp=sharing', 'Accuracy': '0.73', 'Usability': '', 'Scalability': ''},
          "HRNet": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#hrnet', 'Pre-trained model': 'https://drive.google.com/file/d/10DsAVOlVIt1yAT_Wxeich-KrMzBK4g7i/view?usp=sharing', 'Accuracy': '0.50', 'Usability': '', 'Scalability': ''},
          "Mask2former": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#mask2former', 'Pre-trained model': 'https://drive.google.com/file/d/1uFQRz4aKwDsUE3zOCyu5Y2zU_mS3E7mO/view?usp=sharing', 'Accuracy': '0.46', 'Usability': '', 'Scalability': ''},
          "Mask RCNN": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#mask-rcnn', 'Pre-trained model': 'https://drive.google.com/file/d/18l64TKnxLM5IS0i_OQ30rDQP1pZhuxl9/view?usp=sharing', 'Accuracy': '0.47', 'Usability': '', 'Scalability': ''},
          "Segment Anything": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Segment%20Anything', 'Pre-trained model': 'https://drive.google.com/file/d/1xOEyH4XgxVzRcB3vZqCQ33lpRiuhNr99/view?usp=sharing', 'Accuracy': '0.34', 'Usability': '', 'Scalability': ''},
          "RetinaMask": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/RetinaMask', 'Pre-trained model': 'https://drive.google.com/file/d/13XwVnyNz_7jNOlnaa_gMN0Y7WQl7GDit/view?usp=sharing', 'Accuracy': '0.64', 'Usability': '', 'Scalability': ''},
          "Mesmer": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Mesmer', 'Pre-trained model': 'https://drive.google.com/file/d/1uMDEtZ3sFDAulIGrHdjgaTsi2ui1y7Y-/view?usp=sharing', 'Accuracy': '0.33', 'Usability': '', 'Scalability': ''},
          "MS RCNN": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#ms-rcnn', 'Pre-trained model': 'https://drive.google.com/file/d/1Tgcz471lVTmNnqtl7xnUh2ecRdBhaEvo/view?usp=sharing', 'Accuracy': '0.02', 'Usability': '', 'Scalability': ''},
          "FeatureNet": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/FeatureNet', 'Pre-trained model': 'https://drive.google.com/drive/folders/1l8s0gOWGWDE9ocgNCt6-u98nQVWkq-1o?usp=sharing', 'Accuracy': '0.37', 'Usability': '', 'Scalability': ''},
        }, 
        "Trained on Single Type":{
          "Swin-S": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
        }
      }, 
      "Single Channel Image": {
        "Trained on All Types":{
          "Swin-S": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Swin-T": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-t', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Cellpose": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Cellpose_BM', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Cascade Mask RCNN seesaw": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#cascade-mask-rcnn-seesaw', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Centermask2": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Centermask2', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "SOLOv2": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#solov2', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "ResNeSt": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/ResNeSt', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Res2Net": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#res2net', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "RF-Next": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#rf-next', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "StarDist": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Stardist', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "HRNet": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#hrnet', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Mask2former": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#mask2former', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Mask RCNN": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#mask-rcnn', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Segment Anything": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Segment%20Anything', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "RetinaMask": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/RetinaMask', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Mesmer": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Mesmer', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "MS RCNN": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#ms-rcnn', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "FeatureNet": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/FeatureNet', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
        }, 
        "Trained on Single Type":{
          "Swin-S": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
        }
      }
    }, 
    "Whole Cell Segmentation": {
      "Dual Channel Image": {
        "Trained on All Types":{
          "Swin-S": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Swin-T": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-t', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Cellpose": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Cellpose_BM', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Cascade Mask RCNN seesaw": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#cascade-mask-rcnn-seesaw', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Centermask2": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Centermask2', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "SOLOv2": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#solov2', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "ResNeSt": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/ResNeSt', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Res2Net": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#res2net', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "RF-Next": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#rf-next', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "StarDist": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Stardist', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "HRNet": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#hrnet', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Mask2former": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#mask2former', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Mask RCNN": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#mask-rcnn', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Segment Anything": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Segment%20Anything', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "RetinaMask": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/RetinaMask', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Mesmer": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Mesmer', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "MS RCNN": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#ms-rcnn', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "FeatureNet": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/FeatureNet', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
        }, 
        "Trained on Single Type":{
          "Swin-S": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
        }
      }, 
      "Single Channel Image": {
        "Trained on All Types":{
          "Swin-S": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Swin-T": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-t', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Cellpose": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Cellpose_BM', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Cascade Mask RCNN seesaw": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#cascade-mask-rcnn-seesaw', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Centermask2": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Centermask2', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "SOLOv2": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#solov2', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "ResNeSt": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/ResNeSt', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Res2Net": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#res2net', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "RF-Next": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#rf-next', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "StarDist": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Stardist', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "HRNet": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#hrnet', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Mask2former": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#mask2former', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Mask RCNN": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#mask-rcnn', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Segment Anything": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Segment%20Anything', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "RetinaMask": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/RetinaMask', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Mesmer": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Mesmer', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "MS RCNN": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#ms-rcnn', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "FeatureNet": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/FeatureNet', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
        }, 
        "Trained on Single Type":{
          "Swin-S": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
        }
      }
    }
  },
  "Light Microscopy": {
    "Whole Cell Segmentation": {
      "Single Channel Image": {
        "Trained on All Types":{
          "Swin-S": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Swin-T": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-t', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Cellpose": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Cellpose_BM', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Cascade Mask RCNN seesaw": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#cascade-mask-rcnn-seesaw', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Centermask2": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Centermask2', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "SOLOv2": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#solov2', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "ResNeSt": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/ResNeSt', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Res2Net": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#res2net', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "RF-Next": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#rf-next', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "StarDist": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Stardist', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "HRNet": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#hrnet', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Mask2former": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#mask2former', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Mask RCNN": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#mask-rcnn', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Segment Anything": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Segment%20Anything', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "RetinaMask": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/RetinaMask', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "Mesmer": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Mesmer', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "MS RCNN": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#ms-rcnn', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
          "FeatureNet": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/FeatureNet', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
        }, 
        "Trained on Single Type":{
          "Swin-S": {'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': '', 'Accuracy': '', 'Usability': '', 'Scalability': ''},
        }
      }
    }
  }
};

updateCommandRows()



