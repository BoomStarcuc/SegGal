/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if (e.key === 'Tab') {
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


document.querySelectorAll('.carousel-container').forEach(container => {
  container.addEventListener('mousedown', function (e) {
    let startX = e.pageX;
    let scrollStartX = this.scrollLeft;

    function onMouseMove(e) {
      let dx = e.pageX - startX;
      this.scrollLeft = scrollStartX - dx;
    }

    // 添加mousemove事件监听
    this.addEventListener('mousemove', onMouseMove);

    // 创建mouseup和mouseleave的事件处理函数
    const onMouseUpOrLeave = () => {
      this.removeEventListener('mousemove', onMouseMove);
    };

    // 绑定mouseup和mouseleave事件
    this.addEventListener('mouseup', onMouseUpOrLeave);
    this.addEventListener('mouseleave', onMouseUpOrLeave);

    // 防止默认行为如文本选择等
    e.preventDefault();
  });
});

function toggleSelected(event) {
  var target = event.target;
  var allLabels = target.parentNode.querySelectorAll('.carousel-label');
  // console.log("target:", target)
  // console.log("allLabels:", allLabels)
  allLabels.forEach(label => label.classList.remove('selected'));
  target.classList.add('selected');
}

// function toggleSelected2(event) {
//   var target = event.target;
//   var allLabels = target.parentNode.querySelectorAll('.option-block');
//   // console.log("target:", target)
//   // console.log("allLabels:", allLabels)
//   allLabels.forEach(label => label.classList.remove('selected'));
//   target.classList.add('selected');
// }

// Add click event listener to each carousel label
document.querySelectorAll('.carousel-label').forEach(label => {
  label.addEventListener('click', toggleSelected);
});

document.addEventListener('DOMContentLoaded', (event) => {
  var optionRows = document.querySelectorAll('.option-row');

  optionRows.forEach(function (row) {
    row.addEventListener('click', function (event) {
      let targetClassList = event.target.classList;

      // 检查是否点击的是option-block或carousel-label
      if (targetClassList.contains('option-block') || targetClassList.contains('carousel-label')) {
        // 移除当前行所有选项的选中状态
        let options = row.querySelectorAll('.option-block, .carousel-label');
        options.forEach(option => option.classList.remove('selected'));

        // 为点击的选项添加选中状态
        event.target.classList.add('selected');

        // 获取选中的选项的文本
        let selectedOption = event.target.textContent.trim();

        // 根据选中的选项更新其他选项的状态
        updateOptions(row.getAttribute('data-method'), selectedOption, Selectedlistener);
      }
    });
  });
});

// document.addEventListener('DOMContentLoaded', () => {
//   // 定义你需要监听变化的data-method列表
//   const dataMethodsToWatch = ["Image Type", "Segmentation Type", "Image Channel", "Training Data", "Order By"];

//   // 为每个data-method查找对应的选项并添加点击事件监听器
//   dataMethodsToWatch.forEach(method => {
//     const methodContainer = document.querySelector(`.option-row[data-method="${method}"]`);
//     if (methodContainer) { // 确保容器存在
//       const options = methodContainer.querySelectorAll('.option-block, .carousel-label');
//       options.forEach(option => {
//         option.addEventListener('click', () => {
//           setTimeout(() => { // 使用setTimeout确保在DOM更新之后调用rankmethod
//             rankmethod(); // 现在应该能获取到最新的selectedValues
//           }, 0); // 延迟0毫秒，即将回调推迟到事件循环的下一个迭代
//         });
//       });
//     }
//   });
// });

function updateOptions(method, selectedOption, callback) {
  // 根据选中的选项和行来决定如何更新其他选项，假设这里有异步操作

  // 模拟异步操作
  setTimeout(() => {
    // console.log('Options updated based on:', method, selectedOption);
    
    if (method === 'Image Type' && selectedOption === 'Light Microscopy') {
      const trainingStrategyContainer = document.querySelector('.option-row[data-method="Training Data"] .carousel-container');

      trainingStrategyContainer.innerHTML = `<div class="carousel-container">
                                                  <div class="carousel-slide">
                                                    <div class="carousel-label selected" id="All">All</div>
                                                    <div class="carousel-label" id="SkBr3">SkBr3</div>
                                                    <div class="carousel-label" id="SK-OV-3">SK-OV-3</div>
                                                    <div class="carousel-label" id="Huh7">Huh7</div>
                                                    <div class="carousel-label" id="BT-474">BT-474</div>
                                                    <div class="carousel-label" id="BV-2">BV-2</div>
                                                    <div class="carousel-label" id="A172">A172</div>
                                                    <div class="carousel-label" id="MCF7">MCF7</div>
                                                    <div class="carousel-label" id="SH-SY5Y">SH-SY5Y</div>
                                                  </div>
                                                </div>`;

      bindEventsToTrainingStrategyOptions();

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

      var OrderByRow = document.querySelector('.option-row[data-method="Order By"]');
      // 获取Segmentation Type下的所有选项
      var OrderByOptions = OrderByRow.querySelectorAll('.option-block');
      // console.log('Selected imageChannelOptions:', imageChannelOptions);

      OrderByOptions.forEach(function (option) {
        option.classList.remove('disabled');
        // 恢复点击事件
        option.style.pointerEvents = 'auto';
        // 恢复透明度
        option.style.opacity = '1';
      });
    }

    if (method === 'Image Type' && selectedOption === 'Fluorescence Staining') {
      const trainingStrategyContainer = document.querySelector('.option-row[data-method="Training Data"] .carousel-container');

      trainingStrategyContainer.innerHTML = `<div class="carousel-container">
                                                <div class="carousel-slide">
                                                  <div class="carousel-label selected" id="All">All</div>
                                                  <div class="carousel-label" id="Lymph Node Metastasis">Lymph Node Metastasis</div>
                                                  <div class="carousel-label" id="Pancreas">Pancreas</div>
                                                  <div class="carousel-label" id="Esophagus">Esophagus</div>
                                                  <div class="carousel-label" id="Tonsil">Tonsil</div>
                                                  <div class="carousel-label" id="Breast">Breast</div>
                                                  <div class="carousel-label" id="Colon">Colon</div>
                                                  <div class="carousel-label" id="Epidermis">Epidermis</div>
                                                  <div class="carousel-label" id="Lymph Node">Lymph Node</div>
                                                  <div class="carousel-label" id="Lung">Lung</div>
                                                  <div class="carousel-label" id="Spleen">Spleen</div>
                                                </div>
                                              </div>`;

      bindEventsToTrainingStrategyOptions();

      // 获取Segmentation Type行
      var segmentationTypeRow = document.querySelector('.option-row[data-method="Segmentation Type"]');
      // 获取Segmentation Type下的所有选项
      var segmentationOptions = segmentationTypeRow.querySelectorAll('.option-block');
      // console.log('Selected segmentationOptions:', segmentationOptions);

      segmentationOptions.forEach(function (option) {
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

      imageChannelOptions.forEach(function (option) {
        option.classList.remove('disabled');
        // 恢复点击事件
        option.style.pointerEvents = 'auto';
        // 恢复透明度
        option.style.opacity = '1';
      });

      var OrderByRow = document.querySelector('.option-row[data-method="Order By"]');
      // 获取Segmentation Type下的所有选项
      var OrderByOptions = OrderByRow.querySelectorAll('.option-block');
      // console.log('Selected imageChannelOptions:', imageChannelOptions);

      OrderByOptions.forEach(function (option) {
        option.classList.remove('disabled');
        // 恢复点击事件
        option.style.pointerEvents = 'auto';
        // 恢复透明度
        option.style.opacity = '1';
      });
    }

    if (method === 'Training Data' && selectedOption != 'All') {
      // 获取Segmentation Type行
      var methodCarousel = document.querySelector('.option-row[data-method="Method"] .carousel-container');
      // console.log('Selected MethodRow:', methodCarousel);

      var methodLabels = methodCarousel.querySelectorAll('.carousel-label');
      // console.log('Selected methodLabels:', methodLabels);

      methodLabels.forEach(function (label) {
        // 检查label的ID是否为'Swin-S'
        if (label.id == 'Swin-S') {
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

      // 获取Segmentation Type行
      var OrderByRow = document.querySelector('.option-row[data-method="Order By"]');
      // 获取Segmentation Type下的所有选项
      var OrderByOptions = OrderByRow.querySelectorAll('.option-block');
      // console.log('Selected OrderByOptions:', OrderByOptions);

      OrderByOptions[0].classList.remove('selected');
      OrderByOptions[0].classList.add('disabled');
      OrderByOptions[0].style.pointerEvents = 'none'; // 禁用点击
      OrderByOptions[0].style.opacity = '0.5'; // 改变透明度表示禁用

      OrderByOptions[2].classList.remove('selected');
      OrderByOptions[2].classList.add('disabled');
      OrderByOptions[2].style.pointerEvents = 'none'; // 禁用点击
      OrderByOptions[2].style.opacity = '0.5'; // 改变透明度表示禁用

      OrderByOptions[3].classList.remove('selected');
      OrderByOptions[3].classList.add('disabled');
      OrderByOptions[3].style.pointerEvents = 'none'; // 禁用点击
      OrderByOptions[3].style.opacity = '0.5'; // 改变透明度表示禁用

      OrderByOptions[1].classList.add('selected');
    }

    if (method === 'Training Data' && selectedOption === 'All') {
      // 获取Segmentation Type行
      var methodCarousel = document.querySelector('.option-row[data-method="Method"] .carousel-container');
      // console.log('Selected MethodRow:', methodCarousel);

      var methodLabels = methodCarousel.querySelectorAll('.carousel-label');
      // console.log('Selected methodLabels:', methodLabels);

      methodLabels.forEach(function (label) {
        // 检查label的ID是否为'Swin-S'
        if (label.id !== 'Swin-S') {
          // 如果不是'Swin-S'，则禁用该标签
          label.classList.remove('disabled');
          label.style.pointerEvents = 'auto'; // 禁用点击
          label.style.opacity = '1'; // 改变透明度表示禁用
        }
      });

      // 获取Segmentation Type行
      var OrderByRow = document.querySelector('.option-row[data-method="Order By"]');
      // 获取Segmentation Type下的所有选项
      var OrderByOptions = OrderByRow.querySelectorAll('.option-block');
      // console.log('Selected OrderByOptions:', OrderByOptions);

      OrderByOptions[0].classList.remove('disabled');
      OrderByOptions[0].style.pointerEvents = 'auto'; // 禁用点击
      OrderByOptions[0].style.opacity = '1'; // 改变透明度表示禁用

      OrderByOptions[2].classList.remove('disabled');
      OrderByOptions[2].style.pointerEvents = 'auto'; // 禁用点击
      OrderByOptions[2].style.opacity = '1'; // 改变透明度表示禁用

      OrderByOptions[3].classList.remove('disabled');
      OrderByOptions[3].style.pointerEvents = 'auto'; // 禁用点击
      OrderByOptions[3].style.opacity = '1'; // 改变透明度表示禁用
    }
    
    // 在更新操作完成后调用回调
    if (typeof callback === 'function') {
      callback();
    }
  }, 100); // 假设更新操作需要100毫秒
}

function Selectedlistener() {
  // console.log('Selectedlistener called.');

  var optionBlocks = document.querySelectorAll('.option-block, .carousel-label');
  
  optionBlocks.forEach(function(block) {
    block.removeEventListener('click', blockClickHandler); // 先移除已有的事件监听器以避免重复绑定
    block.addEventListener('click', blockClickHandler); // 再添加事件监听器
  });
  // 更新命令行
  updateCommandRows();
}


// 定义点击处理函数
function blockClickHandler(event) {
  // console.log('Selected block:', event.target);
  var target = event.target
  // 更新选项为selected状态
  updateSelected(target);

  var isMethodPart = target.closest('.option-row').getAttribute('data-method') === 'Method';
  if (!isMethodPart) {
    rankmethod();
  }

  // 更新命令行
  updateCommandRows();
}


function updateSelected(clickedBlock) {
  // console.log('Select updated.');
  // 移除同一行内其他选项的selected状态
  var allOptionsInRow = clickedBlock.closest('.option-row').querySelectorAll('.option-block, .carousel-label');
  allOptionsInRow.forEach(option => option.classList.remove('selected'));

  // 为被点击的选项添加selected类
  clickedBlock.classList.add('selected');
}


function updateCommandRows() {
  // 此处更新命令行，省略具体实现
  // console.log('Command rows updated.');
    // 此处添加逻辑，根据选中的选项更新GitHub链接和预训练模型链接
  var selectedOptions = document.querySelectorAll('.option-block.selected, .carousel-label.selected');
  // console.log('selectedOptions:', selectedOptions);
  var selectedValues = Array.from(selectedOptions).map(function (opt) { return opt.textContent.trim(); });
  console.log('selectedValues:', selectedValues);


  //根据我选择的值对method进行排序
  // rankmethod(selectedValues)

  // 假定您有逻辑来决定基于选中的选项返回哪个命令和链接
  var githubLink = downloadLinks[selectedValues[0]][selectedValues[1]][selectedValues[2]][selectedValues[3]][selectedValues[5]]['GitHub']; // 根据选择更新这个链接
  var modelLink = downloadLinks[selectedValues[0]][selectedValues[1]][selectedValues[2]][selectedValues[3]][selectedValues[5]]['Pre-trained model']; // 根据选择更新这个链接
  var Usability = downloadLinks[selectedValues[0]][selectedValues[1]][selectedValues[2]][selectedValues[3]][selectedValues[5]]['Usability'];
  var Scalability = downloadLinks[selectedValues[0]][selectedValues[1]][selectedValues[2]][selectedValues[3]][selectedValues[5]]['Scalability'];
  var accuracy = downloadLinks[selectedValues[0]][selectedValues[1]][selectedValues[2]][selectedValues[3]][selectedValues[5]]['Accuracy'];

  var numRows = document.getElementsByClassName('numRows')[0];
  var numLines = numRows.getElementsByTagName('input')
  numLines[0].value = accuracy
  numLines[1].value = Usability

  if (Scalability == '') {
    numLines[2].value = '---'
  } else {
    numLines[2].value = Scalability + 'h'
  }

  // 获取两个command-row，并更新它们的内容
  var commandRows = document.querySelectorAll('.command-row pre');
  if (commandRows.length >= 2) {
    commandRows[0].textContent = githubLink;
    commandRows[1].textContent = modelLink;
  }

  var visitbuttons = document.querySelectorAll('.visit-btn');
  // console.log('Selected block:', block);

  visitbuttons[0].addEventListener('click', function () {
    window.open(githubLink)
  });

  visitbuttons[1].addEventListener('click', function () {
    window.open(modelLink)
  });

}

function rankmethod() {
  // 根据selectedValues获取对应的数据
  selectedOptions2 = document.querySelectorAll('.option-block.selected, .carousel-label.selected');
  // console.log('selectedOptions:', selectedOptions);
  selectedValues2 = Array.from(selectedOptions2).map(function (opt) { return opt.textContent.trim(); });
  console.log("selectedValues2:", selectedValues2)
  let methodsData = []; // 用于存储方法和对应的评分信息
  
  // 假设selectedValues包含了选择的路径，例如["Fluorescence Staining", "Cell Nuclei Segmentation", "Dual Channel Image", "All"]
  if (selectedValues2[3] == 'All'){
    
    let methodCategory = downloadLinks;
    let selecteditems = selectedValues2;
    for(let value of selecteditems.slice(0, 4)) {
      if(methodCategory[value]) {
        methodCategory = methodCategory[value];
      } else {
        console.error("Path not found in downloadLinks structure for value: ", value);
        return;
      }
    }
    
    // console.log('methodCategory:', methodCategory);
    // console.log("selectedValues2[4]:", selectedValues2[4])
    if (selectedValues2[4] != 'Overall'){
      if (selectedValues2[4] == 'Scalability'){
        // console.log("eeeeeeeee")
        let scalabilityValues = Object.values(methodCategory).map(info => parseFloat(info['Scalability']) || 0);
        // console.log("scalabilityValues:", scalabilityValues)
        let mean = scalabilityValues.reduce((acc, val) => acc + val, 0) / scalabilityValues.length;
        let std = Math.sqrt(scalabilityValues.map(val => Math.pow(val - mean, 2)).reduce((acc, val) => acc + val, 0) / scalabilityValues.length);
        // console.log("mean:", mean)
        // console.log("std:", std)

        // 计算每个方法的Z分数和归一化分数
        for (let methodName in methodCategory) {
          let scalability = parseFloat(methodCategory[methodName]['Scalability']) || 0;
          let zScore = (scalability - mean) / std;
          let normalizedScore = 1 - normCDF(zScore);
          methodsData.push({
            name: methodName,
            originalScalability: scalability,
            value: normalizedScore.toFixed(2) // 保留4位小数
          });
        }
      } else {
        for(let methodName in methodCategory) {
          let methodInfo = methodCategory[methodName];
          methodsData.push({
            name: methodName,
            value: methodInfo[selectedValues2[4]]
          });
        }
      }
    } else {
      let scalabilityValues = Object.values(methodCategory).map(info => parseFloat(info['Scalability']) || 0);
      // console.log("scalabilityValues:", scalabilityValues)
      let mean = scalabilityValues.reduce((acc, val) => acc + val, 0) / scalabilityValues.length;
      let std = Math.sqrt(scalabilityValues.map(val => Math.pow(val - mean, 2)).reduce((acc, val) => acc + val, 0) / scalabilityValues.length);

      let Scalabilities = [];
      for (let methodName in methodCategory) {
        let scalability = parseFloat(methodCategory[methodName]['Scalability']) || 0;
        let zScore = (scalability - mean) / std;
        let normalizedScore = 1 - normCDF(zScore);
        Scalabilities.push({
          name: methodName,
          originalScalability: scalability,
          value: normalizedScore.toFixed(2) // 保留4位小数
        });
      }

      // console.log("Scalabilities:", Scalabilities)
      for(let methodName in methodCategory) {
        // console.log("methodName:", methodName)
        let methodInfo = methodCategory[methodName];

        let accuracy = parseFloat(methodInfo['Accuracy']) || 0;
        let usability = parseFloat(methodInfo['Usability']) || 0;
        
        let targetscalability = Scalabilities.find(s => s.name === methodName);
        // console.log("targetscalability:", targetscalability)
        // 获取originalScalability的值
        let scalability = parseFloat(targetscalability ? targetscalability.value : undefined) || 0;
        // console.log("accuracy:", accuracy)
        // console.log("usability:", usability)
        // console.log("scalability:", scalability)

        // 计算平均值，这里假设所有值等权重
        let overall = (accuracy + usability + scalability) / 3;

        methodsData.push({
          name: methodName,
          value: overall.toFixed(2)
        });
      }
    }

    // console.log('methodsData1:', methodsData);
      // 对methodsData进行排序，这里以accuracy为例，可以根据需要调整排序逻辑
    methodsData.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
    // console.log('methodsData2:', methodsData);
    
    // 获取.carousel-slide容器
    let carouselSlide = document.querySelector('.option-row[data-method="Method"] .carousel-slide');
    carouselSlide.innerHTML = ''; // 清空现有的方法标签

    // 根据排序后的methodsData生成新的方法标签
    methodsData.forEach((method, index) => {
      let methodLabel = document.createElement('div');
      if (index == 0){
        methodLabel.className = 'carousel-label selected';
      } else {
        methodLabel.className = 'carousel-label';
      }
      methodLabel.textContent = method.name; // 设置方法名
      // methodLabel.id = method.name.replace(/\s+/g, '-'); // 生成ID，空格替换为短横线
      methodLabel.id = method.name; // 生成ID，空格替换为短横线
      
      carouselSlide.appendChild(methodLabel); // 将新创建的标签添加到.carousel-slide容器中
    });

    // 重新绑定事件监听器到新创建的.carousel-labels
    bindEventsToTrainingStrategyOptions();
  }
  
}

function normCDF(x) {
  let t = 1 / (1 + 0.2316419 * Math.abs(x));
  let d = 0.3989423 * Math.exp(-x * x / 2);
  let probability = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  if (x > 0) {
    return 1 - probability;
  } else {
    return probability;
  }
}


// function bindEventsToOptionblocks() {
//   // 绑定carousel-label的点击事件
//   document.querySelectorAll('.option-block').forEach(label => {
//     // console.log(label.classList.contains('event-bound'))
//     if (!label.classList.contains('event-bound')) {
//       // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa")
//       label.addEventListener('click', toggleSelected2);
//       label.classList.add('event-bound');
      
//     }
//   });
// }

function bindEventsToTrainingStrategyOptions() {
  // 绑定carousel-label的点击事件
  document.querySelectorAll('.carousel-label').forEach(label => {
    // console.log(label.classList.contains('event-bound'))
    if (!label.classList.contains('event-bound')) {
      // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa")
      label.addEventListener('click', toggleSelected);
      label.classList.add('event-bound');
      
    }
  });

  // 绑定carousel的滑动事件
  document.querySelectorAll('.carousel-container').forEach(container => {
    if (!container.classList.contains('event-bound')) {
      container.addEventListener('mousedown', function (e) {
        let startX = e.pageX;
        let scrollStartX = this.scrollLeft;

        // 使用箭头函数以保持this指向container
        const onMouseMove = (e) => {
          let dx = e.pageX - startX;
          this.scrollLeft = scrollStartX - dx;
        };

        // 绑定mousemove事件
        container.addEventListener('mousemove', onMouseMove);

        // 创建mouseup和mouseleave的事件处理函数
        const onMouseUpOrLeave = () => {
          container.removeEventListener('mousemove', onMouseMove);
        };

        // 绑定mouseup和mouseleave事件
        container.addEventListener('mouseup', onMouseUpOrLeave);
        container.addEventListener('mouseleave', onMouseUpOrLeave);

        // 防止鼠标拖动时选中文本
        e.preventDefault();
      });
      container.classList.add('event-bound');
    }
  });
}

document.addEventListener('DOMContentLoaded', (event) => {
  // 查找所有的复制按钮并添加点击事件监听器
  document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', function () {
      // 根据按钮获取对应的pre标签内容
      var content = this.parentNode.previousElementSibling.textContent;
      // 执行复制操作
      navigator.clipboard.writeText(content).then(function () {
        // console.log('Async: Copying to clipboard was successful!');
        // 反馈给用户已复制，比如通过改变按钮文本
        button.textContent = 'Copied!';
        setTimeout(() => button.textContent = 'Copy Link', 2000); // 2秒后恢复按钮原始文本
      }, function (err) {
        console.error('Async: Could not copy text: ', err);
      });
    });
  });
});

// 注意：这里的githubLink和modelLink应该根据实际逻辑来生成
const downloadLinks = {
  "Fluorescence Staining": {
    "Cell Nuclei Segmentation": {
      "Dual Channel Image": {
        "All": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1KcwbXTh1y1qwnDKGP-RJy8N2E5dpRBU3/view?usp=sharing', 'Accuracy': '0.73', 'Usability': '0.69', 'Scalability': '30' },
          "Swin-T": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-t', 'Pre-trained model': 'https://drive.google.com/file/d/1UOzbLDfHPGDJOohqz7XS16mDRKD6hYb8/view?usp=sharing', 'Accuracy': '0.73', 'Usability': '0.69', 'Scalability': '27' },
          "Cellpose": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Cellpose_BM', 'Pre-trained model': 'https://drive.google.com/drive/folders/1hrD134nuaNhgB33ovcSZUisWRvOJ-Bhf?usp=sharing', 'Accuracy': '0.83', 'Usability': '0.67', 'Scalability': '25' },
          "Cascade Mask RCNN seesaw": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#cascade-mask-rcnn-seesaw', 'Pre-trained model': 'https://drive.google.com/file/d/1t9_jwJ56SO2RjOeV5e-J4UllWbpGweR3/view?usp=sharing', 'Accuracy': '0.73', 'Usability': '0.69', 'Scalability': '44' },
          "Centermask2": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Centermask2', 'Pre-trained model': 'https://drive.google.com/file/d/1d7T8cd_O5kCWTOEvXhG3mm2H7stT19MB/view?usp=sharing', 'Accuracy': '0.89', 'Usability': '0.25', 'Scalability': '60' },
          "SOLOv2": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#solov2', 'Pre-trained model': 'https://drive.google.com/file/d/14W54MKOhy4gG9Bh1CCKUc-I0JUaghkg8/view?usp=sharing', 'Accuracy': '0.71', 'Usability': '0.63', 'Scalability': '36' },
          "ResNeSt": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/ResNeSt', 'Pre-trained model': 'https://drive.google.com/file/d/12dqmnDqyxG94vNh9m26Fg2k8DSCDufdQ/view?usp=sharing', 'Accuracy': '0.88', 'Usability': '0.17', 'Scalability': '54' },
          "Res2Net": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#res2net', 'Pre-trained model': 'https://drive.google.com/file/d/1WGXfe38MczACb5dF6_yrsMTsHxs56j3J/view?usp=sharing', 'Accuracy': '0.50', 'Usability': '0.69', 'Scalability': '28' },
          "RF-Next": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#rf-next', 'Pre-trained model': 'https://drive.google.com/file/d/1zGYx6ynlU4BGE1IjkpCDtP4StBEwXHBD/view?usp=sharing', 'Accuracy': '0.50', 'Usability': '0.69', 'Scalability': '22' },
          "StarDist": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Stardist', 'Pre-trained model': 'https://drive.google.com/file/d/1skZwknHJLz8I-rpMHYZee8dgVvrSHFI3/view?usp=sharing', 'Accuracy': '0.73', 'Usability': '0.59', 'Scalability': '50' },
          "HRNet": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#hrnet', 'Pre-trained model': 'https://drive.google.com/file/d/10DsAVOlVIt1yAT_Wxeich-KrMzBK4g7i/view?usp=sharing', 'Accuracy': '0.50', 'Usability': '0.69', 'Scalability': '24' },
          "Mask2former": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#mask2former', 'Pre-trained model': 'https://drive.google.com/file/d/1uFQRz4aKwDsUE3zOCyu5Y2zU_mS3E7mO/view?usp=sharing', 'Accuracy': '0.46', 'Usability': '0.69', 'Scalability': '113' },
          "Mask RCNN": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#mask-rcnn', 'Pre-trained model': 'https://drive.google.com/file/d/18l64TKnxLM5IS0i_OQ30rDQP1pZhuxl9/view?usp=sharing', 'Accuracy': '0.47', 'Usability': '0.69', 'Scalability': '64' },
          "Segment Anything": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Segment%20Anything', 'Pre-trained model': 'https://drive.google.com/file/d/1xOEyH4XgxVzRcB3vZqCQ33lpRiuhNr99/view?usp=sharing', 'Accuracy': '0.34', 'Usability': '0.78', 'Scalability': '0' },
          "RetinaMask": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/RetinaMask', 'Pre-trained model': 'https://drive.google.com/file/d/13XwVnyNz_7jNOlnaa_gMN0Y7WQl7GDit/view?usp=sharing', 'Accuracy': '0.64', 'Usability': '0.02', 'Scalability': '83' },
          "Mesmer": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Mesmer', 'Pre-trained model': 'https://drive.google.com/file/d/1uMDEtZ3sFDAulIGrHdjgaTsi2ui1y7Y-/view?usp=sharing', 'Accuracy': '0.33', 'Usability': '0.38', 'Scalability': '29' },
          "MS RCNN": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#ms-rcnn', 'Pre-trained model': 'https://drive.google.com/file/d/1Tgcz471lVTmNnqtl7xnUh2ecRdBhaEvo/view?usp=sharing', 'Accuracy': '0.02', 'Usability': '0.69', 'Scalability': '40' },
          "FeatureNet": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/FeatureNet', 'Pre-trained model': 'https://drive.google.com/drive/folders/1l8s0gOWGWDE9ocgNCt6-u98nQVWkq-1o?usp=sharing', 'Accuracy': '0.37', 'Usability': '0.01', 'Scalability': '10' },
        },
        "Lymph Node Metastasis": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1I3x_tCqj6OmcberuEDOMU5hWdy27VM0O/view?usp=drive_link', 'Accuracy': '0.31', 'Usability': '0.69', 'Scalability': '' },
        },
        "Pancreas": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/16xgRu1x9I964L7doJpxjE3cAz_ANqzXQ/view?usp=drive_link', 'Accuracy': '0.43', 'Usability': '0.69', 'Scalability': '' },
        },
        "Esophagus": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1MDfGSIV9wbMgUh9olOtV3bLzzLCZe-4U/view?usp=drive_link', 'Accuracy': '0.37', 'Usability': '0.69', 'Scalability': '' },
        },
        "Tonsil": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1XVdXyzXyqBLlwYBEn1WtNA7yXesVfdIT/view?usp=drive_link', 'Accuracy': '0.28', 'Usability': '0.69', 'Scalability': '' },
        },
        "Breast": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1YxmM8rlM4kNP8ondhSDlSc9_68gWb-wX/view?usp=sharing', 'Accuracy': '0.44', 'Usability': '0.69', 'Scalability': '' },
        },
        "Colon": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1-jXYgdmxbpqpyZ16dvWm_mSR67_QME6P/view?usp=drive_link', 'Accuracy': '0.39', 'Usability': '0.69', 'Scalability': '' },
        },
        "Epidermis": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/14dHw2HWSTi_9P_TxtNV_Py8hoLb6HZZI/view?usp=drive_link', 'Accuracy': '0.38', 'Usability': '0.69', 'Scalability': '' },
        },
        "Lymph Node": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1EhZZ6ElfmtadV9aQugk7WuMFy-H8bMZu/view?usp=drive_link', 'Accuracy': '0.42', 'Usability': '0.69', 'Scalability': '' },
        },
        "Lung": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1LDTFcJIAZojW8hVBIPSmfOB7z4xuVCDM/view?usp=drive_link', 'Accuracy': '0.01', 'Usability': '0.69', 'Scalability': '' },
        },
        "Spleen": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1fNinRCRFOuzLnun9hUaXwxV8RoS2Yibm/view?usp=drive_link', 'Accuracy': '0.00', 'Usability': '0.69', 'Scalability': '' },
        }
      },
      "Single Channel Image": {
        "All": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1pUO5e9SzWNSlE9ZZ_ig-vqO54TJ00uIj/view?usp=sharing', 'Accuracy': '0.72', 'Usability': '0.69', 'Scalability': '20' },
          "Swin-T": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-t', 'Pre-trained model': 'https://drive.google.com/file/d/1cLqLPEmnuILW7oj39FntdTgsjZc4LWz-/view?usp=sharing', 'Accuracy': '0.72', 'Usability': '0.69', 'Scalability': '17' },
          "Cellpose": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Cellpose_BM', 'Pre-trained model': 'https://drive.google.com/file/d/1HG-_kjZ4Tuw9Ow6y232okrxw5EHfI58U/view?usp=sharing', 'Accuracy': '0.77', 'Usability': '0.67', 'Scalability': '13' },
          "Cascade Mask RCNN seesaw": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#cascade-mask-rcnn-seesaw', 'Pre-trained model': 'https://drive.google.com/file/d/1oRWTNJExub1nhEk4JjQOi-pQ-17xFcYE/view?usp=sharing', 'Accuracy': '0.69', 'Usability': '0.69', 'Scalability': '32' },
          "Centermask2": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Centermask2', 'Pre-trained model': 'https://drive.google.com/file/d/1CN7f8H4MI1QgBC9OdATN8BIoB7jO4DA-/view?usp=sharing', 'Accuracy': '0.71', 'Usability': '0.25', 'Scalability': '54' },
          "SOLOv2": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#solov2', 'Pre-trained model': 'https://drive.google.com/file/d/1gAaen35dcF9D2Xf_LNf4BySz4K74xw4Q/view?usp=sharing', 'Accuracy': '0.69', 'Usability': '0.63', 'Scalability': '25' },
          "ResNeSt": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/ResNeSt', 'Pre-trained model': 'https://drive.google.com/file/d/1eHknAdfk4vmxDTX3qUaT6RTK31r6Vjcn/view?usp=sharing', 'Accuracy': '0.70', 'Usability': '0.17', 'Scalability': '50' },
          "Res2Net": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#res2net', 'Pre-trained model': 'https://drive.google.com/file/d/11hy1yimjVLZN4Fj_TeMFyEmJr6ppxskj/view?usp=sharing', 'Accuracy': '0.47', 'Usability': '0.69', 'Scalability': '23' },
          "RF-Next": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#rf-next', 'Pre-trained model': 'https://drive.google.com/file/d/1P6NDVlOAEunch_d1bgV6C8NcizGYB16E/view?usp=sharing', 'Accuracy': '0.45', 'Usability': '0.69', 'Scalability': '14' },
          "StarDist": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Stardist', 'Pre-trained model': 'https://drive.google.com/file/d/1Er78cjy6PQca833rUnjFkXmvOW3j4GXV/view?usp=sharing', 'Accuracy': '0.60', 'Usability': '0.59', 'Scalability': '48' },
          "HRNet": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#hrnet', 'Pre-trained model': 'https://drive.google.com/file/d/1g7qnQVyaqLDJ3SuIk1wWhY3s4tnGY_Mu/view?usp=sharing', 'Accuracy': '0.44', 'Usability': '0.69', 'Scalability': '15' },
          "Mask2former": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#mask2former', 'Pre-trained model': 'https://drive.google.com/file/d/1-OKgaE1PYRT22GozRDmlV_8ai-JVeyhQ/view?usp=sharing', 'Accuracy': '0.60', 'Usability': '0.69', 'Scalability': '90' },
          "Mask RCNN": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#mask-rcnn', 'Pre-trained model': 'https://drive.google.com/file/d/1B96YuCQSCLurjInRuBO0DjLUvhjWTV8c/view?usp=sharing', 'Accuracy': '0.47', 'Usability': '0.69', 'Scalability': '48' },
          "Segment Anything": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Segment%20Anything', 'Pre-trained model': 'https://drive.google.com/file/d/1E4NvrFeySzGjMoZrjjPOQWpE5y0yyFK3/view?usp=sharing', 'Accuracy': '0.54', 'Usability': '0.78', 'Scalability': '0' },
          "RetinaMask": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/RetinaMask', 'Pre-trained model': 'https://drive.google.com/file/d/1VKN1EYjcvA1WoFPHN0EAvSMvDgvbSsmn/view?usp=sharing', 'Accuracy': '0.66', 'Usability': '0.02', 'Scalability': '82' },
          "Mesmer": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Mesmer', 'Pre-trained model': 'https://drive.google.com/file/d/1wqMS9_HHXo3C5cJTBMbM5yU1ZJChlnVM/view?usp=sharing', 'Accuracy': '0.30', 'Usability': '0.38', 'Scalability': '28' },
          "MS RCNN": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#ms-rcnn', 'Pre-trained model': 'https://drive.google.com/file/d/1H23QjaWnMx1ED3DVPKFMtF_WvFPB2CL3/view?usp=sharing', 'Accuracy': '0.46', 'Usability': '0.69', 'Scalability': '24' },
          "FeatureNet": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/FeatureNet', 'Pre-trained model': 'https://drive.google.com/drive/folders/1z-1umIWW7qEpkIw8X6koDxzHaBDfxPuV?usp=sharing', 'Accuracy': '0.25', 'Usability': '0.01', 'Scalability': '8' },
        },
        "Lymph Node Metastasis": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/16BVfS0tZnL-3fPcpemHAvAG6k0qZG78X/view?usp=drive_link', 'Accuracy': '0.32', 'Usability': '0.69', 'Scalability': '' },
        },
        "Pancreas": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1tkqJDjfVXgDwu9QupWFtOni9ApepoOPN/view?usp=drive_link', 'Accuracy': '0.35', 'Usability': '0.69', 'Scalability': '' },
        },
        "Esophagus": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1F5NHCMM6Jl6IsHfkfJ3wpiEYNM1SX0ey/view?usp=drive_link', 'Accuracy': '0.35', 'Usability': '0.69', 'Scalability': '' },
        },
        "Tonsil": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1_p0Vc8kUcpCFbFHTuN_HQ68gekGIZU9y/view?usp=drive_link', 'Accuracy': '0.32', 'Usability': '0.69', 'Scalability': '' },
        },
        "Breast": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1tkqJDjfVXgDwu9QupWFtOni9ApepoOPN/view?usp=drive_link', 'Accuracy': '0.35', 'Usability': '0.69', 'Scalability': '' },
        },
        "Colon": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1LCIFseXL6U2MeO2s4P7dwMt7aN1_ZU1O/view?usp=drive_link', 'Accuracy': '0.37', 'Usability': '0.69', 'Scalability': '' },
        },
        "Epidermis": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/15EUZOYaPmbmu8rqAkp9UwzYPtHIFOvW9/view?usp=drive_link', 'Accuracy': '0.33', 'Usability': '0.69', 'Scalability': '' },
        },
        "Lymph Node": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1PMzLOkM3bQM5CxMc5He2nStXGfEcuPZv/view?usp=drive_link', 'Accuracy': '0.37', 'Usability': '0.69', 'Scalability': '' },
        },
        "Lung": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1fwlN05EqlMbTuamvL02WacPsV6Mqute4/view?usp=drive_link', 'Accuracy': '0.01', 'Usability': '0.69', 'Scalability': '' },
        },
        "Spleen": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1oIXwkiNO-ULspD2wSPjnwuLWQWzr2eo8/view?usp=drive_link', 'Accuracy': '0.00', 'Usability': '0.69', 'Scalability': '' },
        }
      }
    },
    "Whole Cell Segmentation": {
      "Dual Channel Image": {
        "All": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1Vnq58-0zGixrwx18tSdxhPcvoM9IMKEr/view?usp=sharing', 'Accuracy': '0.61', 'Usability': '0.69', 'Scalability': '37' },
          "Swin-T": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-t', 'Pre-trained model': 'https://drive.google.com/file/d/1_VtJTwBKRWG91VaqSKLOOIoHMZn1ZKez/view?usp=sharing', 'Accuracy': '0.62', 'Usability': '0.69', 'Scalability': '43' },
          "Cellpose": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Cellpose_BM', 'Pre-trained model': 'https://drive.google.com/drive/folders/16hXHTHQEaduFxHAvCgtQbMHrx2wEWNek?usp=sharing', 'Accuracy': '0.70', 'Usability': '0.67', 'Scalability': '19' },
          "Cascade Mask RCNN seesaw": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#cascade-mask-rcnn-seesaw', 'Pre-trained model': 'https://drive.google.com/file/d/1BzUv9B7gm9gvQh6aSfTr4x6kiDosYHHf/view?usp=sharing', 'Accuracy': '0.68', 'Usability': '0.69', 'Scalability': '40' },
          "Centermask2": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Centermask2', 'Pre-trained model': 'https://drive.google.com/file/d/1n2SNsEBljuvum5nTag3c-4PIfM8WVsId/view?usp=sharing', 'Accuracy': '0.79', 'Usability': '0.25', 'Scalability': '66' },
          "SOLOv2": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#solov2', 'Pre-trained model': 'https://drive.google.com/file/d/1f1Y-tCOH2bv2evEq1nsGI_5vv_vYp11T/view?usp=sharing', 'Accuracy': '0.36', 'Usability': '0.63', 'Scalability': '31' },
          "ResNeSt": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/ResNeSt', 'Pre-trained model': 'https://drive.google.com/file/d/1X-yFhLWCRjdcyVajgrXmHLvhiH5pbfoN/view?usp=sharing', 'Accuracy': '0.76', 'Usability': '0.17', 'Scalability': '59' },
          "Res2Net": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#res2net', 'Pre-trained model': 'https://drive.google.com/file/d/1Q5KeOynY94Y1gWooGXS2LHaibthqBNrZ/view?usp=sharing', 'Accuracy': '0.52', 'Usability': '0.69', 'Scalability': '31' },
          "RF-Next": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#rf-next', 'Pre-trained model': 'https://drive.google.com/file/d/1QVzTgYNfTGWZ9Ljukr_NfM-rCrLJ0VCB/view?usp=sharing', 'Accuracy': '0.51', 'Usability': '0.69', 'Scalability': '25' },
          "StarDist": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Stardist', 'Pre-trained model': 'https://drive.google.com/file/d/16oTVbECgEzt6TCpNbck_WwwN5dKlPE4L/view?usp=sharing', 'Accuracy': '0.57', 'Usability': '0.59', 'Scalability': '46' },
          "HRNet": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#hrnet', 'Pre-trained model': 'https://drive.google.com/file/d/17tqlr6LuEYvhEp2QYEt9VUIUuB9fhjoS/view?usp=sharing', 'Accuracy': '0.53', 'Usability': '0.69', 'Scalability': '30' },
          "Mask2former": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#mask2former', 'Pre-trained model': 'https://drive.google.com/file/d/1janiw29wJf2CZ0OeM8wfrfWckuLXoXUB/view?usp=sharing', 'Accuracy': '0.39', 'Usability': '0.69', 'Scalability': '101' },
          "Mask RCNN": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#mask-rcnn', 'Pre-trained model': 'https://drive.google.com/file/d/1wZ1pIOWJDv24SaW1Pt46CHlC07HnwEEo/view?usp=sharing', 'Accuracy': '0.49', 'Usability': '0.69', 'Scalability': '60' },
          "Segment Anything": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Segment%20Anything', 'Pre-trained model': 'https://drive.google.com/file/d/1wPRfvJ-htRYoLBHKg9etGUfvf9hkJt2I/view?usp=sharing', 'Accuracy': '0.22', 'Usability': '0.78', 'Scalability': '0' },
          "RetinaMask": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/RetinaMask', 'Pre-trained model': 'https://drive.google.com/file/d/1IgpVYwlUkSPtWJ7V7JgQRNNSpeCmpO5Q/view?usp=sharing', 'Accuracy': '0.55', 'Usability': '0.02', 'Scalability': '75' },
          "Mesmer": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Mesmer', 'Pre-trained model': 'https://drive.google.com/file/d/1ANm2HVNoVpW8wpJGa1ykWa0SDjNDPZXE/view?usp=sharing', 'Accuracy': '0.44', 'Usability': '0.38', 'Scalability': '27' },
          "MS RCNN": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#ms-rcnn', 'Pre-trained model': 'https://drive.google.com/file/d/18ke9suhFZ02YPiORDrhcyiMacHF7ZACT/view?usp=sharing', 'Accuracy': '0.03', 'Usability': '0.69', 'Scalability': '58' },
          "FeatureNet": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/FeatureNet', 'Pre-trained model': 'https://drive.google.com/drive/folders/18dZOe9DuTiMWYscmUW_HsL1B-2xhy9bE?usp=sharing', 'Accuracy': '0.13', 'Usability': '0.01', 'Scalability': '13' },
        },
        "Lymph Node Metastasis": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/16Zdpp6K1tYOf2XkzTFDM7ycBTrDVGzlj/view?usp=drive_link', 'Accuracy': '0.20', 'Usability': '0.69', 'Scalability': '' },
        },
        "Pancreas": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/185VsG-n1nyBJf7je_zLGxhPxd8HmSUux/view?usp=drive_link', 'Accuracy': '0.32', 'Usability': '0.69', 'Scalability': '' },
        },
        "Esophagus": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1Y8-ypF3S5a0b9BOHWj1KYQUt39iYKeed/view?usp=drive_link', 'Accuracy': '0.25', 'Usability': '0.69', 'Scalability': '' },
        },
        "Tonsil": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1wHGWg2v0_sdcQYQGqYgdZIEzRk-anEcz/view?usp=drive_link', 'Accuracy': '0.23', 'Usability': '0.69', 'Scalability': '' },
        },
        "Breast": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1Mo5eyw-8fVnKWEODkO2S7lC4EVXH439f/view?usp=sharing', 'Accuracy': '0.37', 'Usability': '0.69', 'Scalability': '' },
        },
        "Colon": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1Ccp0sakNeQdNfvRoBBz0BfWRkAoOt8Nb/view?usp=drive_link', 'Accuracy': '0.36', 'Usability': '0.69', 'Scalability': '' },
        },
        "Epidermis": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/17vmz09yy2xL96zKt5jyNH1oKBv9yTUXI/view?usp=drive_link', 'Accuracy': '0.25', 'Usability': '0.69', 'Scalability': '' },
        },
        "Lymph Node": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1bjpuGWRJAWpyevvrsf0h1s2cJP1bkh8B/view?usp=drive_link', 'Accuracy': '0.30', 'Usability': '0.69', 'Scalability': '' },
        },
        "Lung": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1iGoqLap1dSZopTIYkTNy8vXI470Xoz8R/view?usp=drive_link', 'Accuracy': '0.01', 'Usability': '0.69', 'Scalability': '' },
        },
        "Spleen": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1Rz3F9Hso2UgjI34BFng63yQPW6xaHA2E/view?usp=drive_link', 'Accuracy': '0.04', 'Usability': '0.69', 'Scalability': '' },
        }
      },
      "Single Channel Image": {
        "All": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1jsJTma2j2wv_b10oYDu9Yp7tAziYr-3H/view?usp=sharing', 'Accuracy': '0.33', 'Usability': '0.69', 'Scalability': '24' },
          "Swin-T": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-t', 'Pre-trained model': 'https://drive.google.com/file/d/1PMjBbs7Q8Ez0k6DwNPn8VhQJ29yev6tz/view?usp=sharing', 'Accuracy': '0.33', 'Usability': '0.69', 'Scalability': '30' },
          "Cellpose": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Cellpose_BM', 'Pre-trained model': 'https://drive.google.com/file/d/1lG-QKvin3m6TTuHRR0qnucLsRfrhL7OF/view?usp=sharing', 'Accuracy': '0.17', 'Usability': '0.67', 'Scalability': '9' },
          "Cascade Mask RCNN seesaw": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#cascade-mask-rcnn-seesaw', 'Pre-trained model': 'https://drive.google.com/file/d/1D_iS_eJhufKOPnpZDEvktojwx5jbrKA8/view?usp=sharing', 'Accuracy': '0.33', 'Usability': '0.69', 'Scalability': '30' },
          "Centermask2": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Centermask2', 'Pre-trained model': 'https://drive.google.com/file/d/11_1z6zQau05SAoGW9aF9ySYsZM72PFzs/view?usp=sharing', 'Accuracy': '0.30', 'Usability': '0.25', 'Scalability': '58' },
          "SOLOv2": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#solov2', 'Pre-trained model': 'https://drive.google.com/file/d/10yAH_i8JlryZ1aOwJm47ZO9zvoh3YWKC/view?usp=sharing', 'Accuracy': '0.29', 'Usability': '0.63', 'Scalability': '23' },
          "ResNeSt": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/ResNeSt', 'Pre-trained model': 'https://drive.google.com/file/d/1JbFlz4VNT7UlztecyA7UKpyVd-j1Bnpj/view?usp=sharing', 'Accuracy': '0.32', 'Usability': '0.17', 'Scalability': '51' },
          "Res2Net": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#res2net', 'Pre-trained model': 'https://drive.google.com/file/d/1p4J1bBVGnj4WjK67VNmF_qZwOfaVd2gJ/view?usp=sharing', 'Accuracy': '0.31', 'Usability': '0.69', 'Scalability': '23' },
          "RF-Next": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#rf-next', 'Pre-trained model': 'https://drive.google.com/file/d/1vXRIEpHrE06KAH5_LPC5qhQJyA_q59y3/view?usp=sharing', 'Accuracy': '0.28', 'Usability': '0.69', 'Scalability': '14' },
          "StarDist": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Stardist', 'Pre-trained model': 'https://drive.google.com/file/d/1tDHwDUZ1lw4eApjNqbU1TiN1ePHi7MaU/view?usp=sharing', 'Accuracy': '0.33', 'Usability': '0.59', 'Scalability': '43' },
          "HRNet": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#hrnet', 'Pre-trained model': 'https://drive.google.com/file/d/1o2jLYZOgGwNgDd3lXQTAyHnaL7DUew_-/view?usp=sharing', 'Accuracy': '0.27', 'Usability': '0.69', 'Scalability': '24' },
          "Mask2former": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#mask2former', 'Pre-trained model': 'https://drive.google.com/file/d/1ymO6exgmquj1ZAcsO9TifH5oas8gx9AM/view?usp=sharing', 'Accuracy': '0.30', 'Usability': '0.69', 'Scalability': '72' },
          "Mask RCNN": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#mask-rcnn', 'Pre-trained model': 'https://drive.google.com/file/d/1lLJYm9gwAcWjoEk3zqSr4H_kRD8i5jaO/view?usp=sharing', 'Accuracy': '0.29', 'Usability': '0.69', 'Scalability': '45' },
          "Segment Anything": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Segment%20Anything', 'Pre-trained model': 'https://drive.google.com/file/d/1NCL3rXGrpfmCLMTfgcl2MggnUoiwt6YX/view?usp=sharing', 'Accuracy': '0.08', 'Usability': '0.78', 'Scalability': '0' },
          "RetinaMask": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/RetinaMask', 'Pre-trained model': 'https://drive.google.com/file/d/1WIIDWuX2mW3vephJr-uqmwJh0oLebFWZ/view?usp=sharing', 'Accuracy': '0.23', 'Usability': '0.02', 'Scalability': '69' },
          "Mesmer": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Mesmer', 'Pre-trained model': 'https://drive.google.com/file/d/17ak0MzQBa1guqBh14hU4qAKqjF16Nmvh/view?usp=sharing', 'Accuracy': '0.13', 'Usability': '0.38', 'Scalability': '24' },
          "MS RCNN": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#ms-rcnn', 'Pre-trained model': 'https://drive.google.com/file/d/1vfLjXDTGixq3DXoBOyyheRgJkoj9ei5g/view?usp=sharing', 'Accuracy': '0.28', 'Usability': '0.69', 'Scalability': '40' },
          "FeatureNet": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/FeatureNet', 'Pre-trained model': 'https://drive.google.com/drive/folders/1_0d-4Lv44pZ4MZDKAXG_bTK3GjCEQSER?usp=sharing', 'Accuracy': '0.02', 'Usability': '0.01', 'Scalability': '9' },
        },
        "Lymph Node Metastasis": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1HMhkqS5S5F2mRpCIf9JFM4VT9FG2cW1n/view?usp=drive_link', 'Accuracy': '0.08', 'Usability': '0.69', 'Scalability': '' },
        },
        "Pancreas": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1nipxucRXEPGqzaljN06Ja086UK35LVBN/view?usp=drive_link', 'Accuracy': '0.09', 'Usability': '0.69', 'Scalability': '' },
        },
        "Esophagus": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1Pu1C_K2BEGcOX-OhszlEeJaVI7ue_AEe/view?usp=sharing', 'Accuracy': '0.14', 'Usability': '0.69', 'Scalability': '' },
        },
        "Tonsil": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1IP20D5RQze03B4Q_Uc3niNLUbjneRbe2/view?usp=drive_link', 'Accuracy': '0.11', 'Usability': '0.69', 'Scalability': '' },
        },
        "Breast": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/17vIMM5NZdeaz9p034g5UDYBcuk1y08xi/view?usp=drive_link', 'Accuracy': '0.13', 'Usability': '0.69', 'Scalability': '' },
        },
        "Colon": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1i7aT1hZ-YYZsW0X4yTlnWavlUGkRUbld/view?usp=drive_link', 'Accuracy': '0.11', 'Usability': '0.69', 'Scalability': '' },
        },
        "Epidermis": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1S3h9MLpoNnqYAMb2pM2QcvDt5i4Z1meg/view?usp=drive_link', 'Accuracy': '0.12', 'Usability': '0.69', 'Scalability': '' },
        },
        "Lymph Node": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/11mVtIqsw4604CqQjOX6E82oufqMpj-Rk/view?usp=drive_link', 'Accuracy': '0.11', 'Usability': '0.69', 'Scalability': '' },
        },
        "Lung": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1JpiyOt0kEjlPP-8UGFGL1uh6M3xmLnGH/view?usp=drive_link', 'Accuracy': '0.01', 'Usability': '0.69', 'Scalability': '' },
        },
        "Spleen": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1J_ANgU45Pll2VTHXZNoZZ1Fms_848AdC/view?usp=drive_link', 'Accuracy': '0.00', 'Usability': '0.69', 'Scalability': '' },
        }
      }
    }
  },
  "Light Microscopy": {
    "Whole Cell Segmentation": {
      "Single Channel Image": {
        "All": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1onDLW8UuZUbOAy_3ZoXOM1Ly1KB1h8sc/view?usp=sharing', 'Accuracy': '0.56', 'Usability': '0.69', 'Scalability': '28' },
          "Swin-T": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-t', 'Pre-trained model': 'https://drive.google.com/drive/folders/16koFHQTZE5HhV0QB3ULKLOFKtG7Pzyl5?usp=sharing', 'Accuracy': '0.54', 'Usability': '0.69', 'Scalability': '17' },
          "Cellpose": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Cellpose_BM', 'Pre-trained model': 'https://drive.google.com/file/d/1O6TcqApoDorge7ITQ1HcmB6aRNb8UR7z/view?usp=drive_link', 'Accuracy': '0.32', 'Usability': '0.67', 'Scalability': '17' },
          "Cascade Mask RCNN seesaw": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#cascade-mask-rcnn-seesaw', 'Pre-trained model': 'https://drive.google.com/file/d/107JG2Jt98JzDiIHSw42cAxoqxnhnlZM3/view?usp=drive_link', 'Accuracy': '0.54', 'Usability': '0.69', 'Scalability': '27' },
          "Centermask2": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Centermask2', 'Pre-trained model': 'https://drive.google.com/file/d/1yKrVEV4Airz6sHcwpBIPhE0fc7w9CQk7/view?usp=drive_link', 'Accuracy': '0.63', 'Usability': '0.25', 'Scalability': '122' },
          "SOLOv2": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#solov2', 'Pre-trained model': 'https://drive.google.com/file/d/1ArRHSnHhOZ1NiBCydrdnwQmATrAMJIzR/view?usp=drive_link', 'Accuracy': '0.42', 'Usability': '0.63', 'Scalability': '22' },
          "ResNeSt": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/ResNeSt', 'Pre-trained model': 'https://drive.google.com/file/d/1tPsgfUmPYVxmcMMGNSyJQjEVdfepBuqP/view?usp=drive_link', 'Accuracy': '0.60', 'Usability': '0.17', 'Scalability': '128' },
          "Res2Net": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#res2net', 'Pre-trained model': 'https://drive.google.com/file/d/1bkmUsge-zW7_PP8qrKS9LvSMVOoz6Glf/view?usp=drive_link', 'Accuracy': '0.50', 'Usability': '0.69', 'Scalability': '13' },
          "RF-Next": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#rf-next', 'Pre-trained model': 'https://drive.google.com/file/d/1iJBQ4NIHOdgLwDJ2MYThEQl88pe4sJiB/view?usp=drive_link', 'Accuracy': '0.35', 'Usability': '0.69', 'Scalability': '15' },
          "StarDist": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Stardist', 'Pre-trained model': 'https://drive.google.com/file/d/1Jyp_lBWPsHzw_Jh9wPvuJakJkz4a9r0T/view?usp=drive_link', 'Accuracy': '0.45', 'Usability': '0.59', 'Scalability': '123' },
          "HRNet": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#hrnet', 'Pre-trained model': 'https://drive.google.com/file/d/17MV_8zNMIueOrjvTJTfg5HnKHpynprT8/view?usp=drive_link', 'Accuracy': '0.36', 'Usability': '0.69', 'Scalability': '17' },
          "Mask2former": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#mask2former', 'Pre-trained model': 'https://drive.google.com/file/d/1UPPAYF4qRV5DopgljF8kad1j_Zk47Bgp/view?usp=drive_link', 'Accuracy': '0.50', 'Usability': '0.69', 'Scalability': '50' },
          "Mask RCNN": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#mask-rcnn', 'Pre-trained model': 'https://drive.google.com/file/d/14RXcdohLffYfLI0N8IcT6HtXhn7x7lgK/view?usp=drive_link', 'Accuracy': '0.39', 'Usability': '0.69', 'Scalability': '60' },
          "Segment Anything": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Segment%20Anything', 'Pre-trained model': 'https://drive.google.com/file/d/1zEdGghq3buVa6aSBnCZEEBm44n1bnN6l/view?usp=drive_link', 'Accuracy': '0.23', 'Usability': '0.78', 'Scalability': '0' },
          "RetinaMask": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/RetinaMask', 'Pre-trained model': 'https://drive.google.com/file/d/1VQEjdY6XA5WKAZoGb-K9gAqYyFvY8x4o/view?usp=drive_link', 'Accuracy': '0.32', 'Usability': '0.02', 'Scalability': '84' },
          "Mesmer": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/Mesmer', 'Pre-trained model': 'https://drive.google.com/file/d/1BIYPN9fxXKFVT1BD1zX4_Xj_WIt0950B/view?usp=drive_link', 'Accuracy': '0.17', 'Usability': '0.38', 'Scalability': '33' },
          "MS RCNN": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#ms-rcnn', 'Pre-trained model': 'https://drive.google.com/file/d/19wDFucKmvqMHpV0A0nYElwbSt12FAfLN/view?usp=drive_link', 'Accuracy': '0.35', 'Usability': '0.69', 'Scalability': '15' },
          "FeatureNet": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/FeatureNet', 'Pre-trained model': 'https://drive.google.com/drive/folders/1cx7v5fXq2za-0g9YOd-AgiMzZU5lh39q?usp=drive_link', 'Accuracy': '0.14', 'Usability': '0.01', 'Scalability': '16' },
        },
        "SkBr3": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1M9_niyCZCsuh5PI39Xbi-LVOEDrvYuAC/view?usp=drive_link', 'Accuracy': '0.31', 'Usability': '0.69', 'Scalability': '' },
        },
        "SK-OV-3": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1FpiIyyEQ3a9sYagzqUu0LB7-25HDKeDg/view?usp=drive_link', 'Accuracy': '0.31', 'Usability': '0.69', 'Scalability': '' },
        },
        "Huh7": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1hivY2dqRBKKl1HcHKG6Nf02gzauKzej1/view?usp=drive_link', 'Accuracy': '0.32', 'Usability': '0.69', 'Scalability': '' },
        },
        "BT-474": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1SlKiIS6ba27CaEw_h5NGXHwU3Em5eSNG/view?usp=drive_link', 'Accuracy': '0.35', 'Usability': '0.69', 'Scalability': '' },
        },
        "BV-2": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1Hu8U7BL0ZBIiP-WaRKiEb2D_ZvU3uOW7/view?usp=drive_link', 'Accuracy': '0.15', 'Usability': '0.69', 'Scalability': '' },
        },
        "A172": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1Q1cf3DP6nvfd0GfLCiuf0NY09Wxl_1Nm/view?usp=drive_link', 'Accuracy': '0.33', 'Usability': '0.69', 'Scalability': '' },
        },
        "MCF7": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1bq4zEkP6Dgm3nfPRzHZgyD5KTYw8rY5V/view?usp=drive_link', 'Accuracy': '0.34', 'Usability': '0.69', 'Scalability': '' },
        },
        "SH-SY5Y": {
          "Swin-S": { 'GitHub': 'https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark/tree/master/mmdet_BM#swin-s', 'Pre-trained model': 'https://drive.google.com/file/d/1hpwnvOZQYjQMqpleI7lg5KPLSmPfzXTO/view?usp=drive_link', 'Accuracy': '0.22', 'Usability': '0.69', 'Scalability': '' },
        },
      }
    }
  }
};



