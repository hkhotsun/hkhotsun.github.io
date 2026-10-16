/**
 * CKEditor 5 简化版实现 - 仅包含文字相关功能
 * 基于CKEditor 5的API和功能
 */

// 创建CKEditor 5的全局对象
window.CKEDITOR = {
    // 存储编辑器实例
    instances: {},

    // 替换textarea为CKEditor 5
    replace: function (elementId, options) {
        const textarea = document.getElementById(elementId);
        if (!textarea) {
            console.error('Textarea with id "' + elementId + '" not found');
            return null;
        }

        // 隐藏原始textarea
        textarea.style.display = 'none';

        // 创建编辑器容器
        const editorContainer = document.createElement('div');
        editorContainer.className = 'ckeditor5-container';
        editorContainer.style.border = '1px solid #ccc';
        editorContainer.style.borderRadius = '4px';
        editorContainer.style.padding = '0';
        editorContainer.style.backgroundColor = '#fff';
        editorContainer.style.width = '100%';

        // 创建工具栏
        const toolbar = document.createElement('div');
        toolbar.className = 'ckeditor5-toolbar';
        toolbar.style.borderBottom = '1px solid #ccc';
        toolbar.style.padding = '8px';
        toolbar.style.backgroundColor = '#f8f8f8';
        toolbar.style.display = 'flex';
        toolbar.style.flexWrap = 'wrap';
        toolbar.style.gap = '4px';

        // 创建编辑区域
        const editorContent = document.createElement('div');
        editorContent.className = 'ckeditor5-content';
        editorContent.contentEditable = true;
        editorContent.style.minHeight = (options.height || 200) + 'px';
        editorContent.style.padding = '12px';
        editorContent.style.outline = 'none';
        editorContent.style.overflow = 'auto';
        editorContent.innerHTML = textarea.value || '';

        // 添加工具栏按钮 - 仅文字相关功能
        const toolbarButtons = [
            {
                name: 'paragraph',
                title: '段落',
                icon: '正文',
                command: 'formatBlock',
                value: 'p'
            },
            {
                name: 'heading1',
                title: '标题1',
                icon: 'H1',
                command: 'formatBlock',
                value: 'h1'
            },
            {
                name: 'heading2',
                title: '标题2',
                icon: 'H2',
                command: 'formatBlock',
                value: 'h2'
            },
            {
                name: 'heading3',
                title: '标题3',
                icon: 'H3',
                command: 'formatBlock',
                value: 'h3'
            },
            {
                name: 'bold',
                title: '加粗',
                icon: 'B',
                command: 'bold'
            },
            {
                name: 'italic',
                title: '斜体',
                icon: 'I',
                command: 'italic'
            },
            {
                name: 'underline',
                title: '下划线',
                icon: 'U',
                command: 'underline'
            },
            {
                name: 'strikethrough',
                title: '删除线',
                icon: 'S',
                command: 'strikeThrough'
            },
            {
                name: 'subscript',
                title: '下标',
                icon: 'X₂',
                command: 'subscript'
            },
            {
                name: 'superscript',
                title: '上标',
                icon: 'X²',
                command: 'superscript'
            },
            {
                name: 'bulletedList',
                title: '无序列表',
                icon: '•',
                command: 'insertUnorderedList'
            },
            {
                name: 'numberedList',
                title: '有序列表',
                icon: '1.',
                command: 'insertOrderedList'
            },
            {
                name: 'indent',
                title: '增加缩进',
                icon: '→',
                command: 'indent'
            },
            {
                name: 'outdent',
                title: '减少缩进',
                icon: '←',
                command: 'outdent'
            },
            {
                name: 'alignLeft',
                title: '左对齐',
                icon: '⬅',
                command: 'justifyLeft'
            },
            {
                name: 'alignCenter',
                title: '居中',
                icon: '⬌',
                command: 'justifyCenter'
            },
            {
                name: 'alignRight',
                title: '右对齐',
                icon: '➡',
                command: 'justifyRight'
            },
            {
                name: 'alignJustify',
                title: '两端对齐',
                icon: '≡',
                command: 'justifyFull'
            },
            {
                name: 'blockquote',
                title: '引用',
                icon: '❝',
                command: 'formatBlock',
                value: 'blockquote'
            },
            {
                name: 'code',
                title: '代码',
                icon: '</>',
                command: 'formatBlock',
                value: 'pre'
            },
            {
                name: 'removeFormat',
                title: '清除格式',
                icon: '✖',
                command: 'removeFormat'
            },
            {
                name: 'undo',
                title: '撤销',
                icon: '↶',
                command: 'undo'
            },
            {
                name: 'redo',
                title: '重做',
                icon: '↷',
                command: 'redo'
            }
        ];

        // 创建按钮组
        const buttonGroups = {
            format: ['paragraph', 'heading1', 'heading2', 'heading3'],
            basicStyles: ['bold', 'italic', 'underline', 'strikethrough'],
            script: ['subscript', 'superscript'],
            lists: ['bulletedList', 'numberedList'],
            indent: ['indent', 'outdent'],
            alignment: ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify'],
            blocks: ['blockquote', 'code'],
            tools: ['removeFormat'],
            history: ['undo', 'redo']
        };

        // 创建按钮组容器
        Object.keys(buttonGroups).forEach(groupName => {
            const groupContainer = document.createElement('div');
            groupContainer.style.display = 'inline-flex';
            groupContainer.style.gap = '2px';
            groupContainer.style.marginRight = '8px';

            buttonGroups[groupName].forEach(buttonName => {
                const buttonConfig = toolbarButtons.find(btn => btn.name === buttonName);
                if (buttonConfig) {
                    const button = createToolbarButton(buttonConfig, editorContent);
                    groupContainer.appendChild(button);
                }
            });

            toolbar.appendChild(groupContainer);
        });

        // 添加颜色选择器
        const colorGroup = document.createElement('div');
        colorGroup.style.display = 'inline-flex';
        colorGroup.style.alignItems = 'center';
        colorGroup.style.marginRight = '8px';

        const textColorLabel = document.createElement('label');
        textColorLabel.innerHTML = '文字颜色: ';
        textColorLabel.style.fontSize = '12px';
        textColorLabel.style.marginRight = '4px';

        const textColorPicker = document.createElement('input');
        textColorPicker.type = 'color';
        textColorPicker.value = '#000000';
        textColorPicker.style.width = '24px';
        textColorPicker.style.height = '24px';
        textColorPicker.style.border = '1px solid #ccc';
        textColorPicker.style.borderRadius = '2px';
        textColorPicker.style.cursor = 'pointer';

        textColorPicker.addEventListener('change', function () {
            document.execCommand('foreColor', false, this.value);
            editorContent.focus();
        });

        const bgColorLabel = document.createElement('label');
        bgColorLabel.innerHTML = '背景色: ';
        bgColorLabel.style.fontSize = '12px';
        bgColorLabel.style.marginLeft = '8px';
        bgColorLabel.style.marginRight = '4px';

        const bgColorPicker = document.createElement('input');
        bgColorPicker.type = 'color';
        bgColorPicker.value = '#ffffff';
        bgColorPicker.style.width = '24px';
        bgColorPicker.style.height = '24px';
        bgColorPicker.style.border = '1px solid #ccc';
        bgColorPicker.style.borderRadius = '2px';
        bgColorPicker.style.cursor = 'pointer';

        bgColorPicker.addEventListener('change', function () {
            document.execCommand('hiliteColor', false, this.value);
            editorContent.focus();
        });

        colorGroup.appendChild(textColorLabel);
        colorGroup.appendChild(textColorPicker);
        colorGroup.appendChild(bgColorLabel);
        colorGroup.appendChild(bgColorPicker);
        toolbar.appendChild(colorGroup);

        // 添加字体大小选择器
        const fontGroup = document.createElement('div');
        fontGroup.style.display = 'inline-flex';
        fontGroup.style.alignItems = 'center';
        fontGroup.style.marginRight = '8px';

        const fontLabel = document.createElement('label');
        fontLabel.innerHTML = '字体大小: ';
        fontLabel.style.fontSize = '12px';
        fontLabel.style.marginRight = '4px';

        const fontSelect = document.createElement('select');
        fontSelect.style.padding = '4px';
        fontSelect.style.border = '1px solid #ccc';
        fontSelect.style.borderRadius = '2px';

        const fontSizes = [
            { value: '1', text: '很小' },
            { value: '2', text: '小' },
            { value: '3', text: '正常' },
            { value: '4', text: '大' },
            { value: '5', text: '很大' },
            { value: '6', text: '超大' },
            { value: '7', text: '最大' }
        ];

        fontSizes.forEach(size => {
            const option = document.createElement('option');
            option.value = size.value;
            option.text = size.text;
            fontSelect.appendChild(option);
        });

        fontSelect.addEventListener('change', function () {
            document.execCommand('fontSize', false, this.value);
            editorContent.focus();
        });

        fontGroup.appendChild(fontLabel);
        fontGroup.appendChild(fontSelect);
        toolbar.appendChild(fontGroup);

        // 创建工具栏按钮的函数
        function createToolbarButton(config, targetElement) {
            const button = document.createElement('button');
            button.type = 'button';
            button.title = config.title;
            button.innerHTML = config.icon;
            button.style.padding = '6px 10px';
            button.style.border = '1px solid #ccc';
            button.style.borderRadius = '3px';
            button.style.backgroundColor = '#fff';
            button.style.cursor = 'pointer';
            button.style.fontSize = '14px';
            button.style.fontWeight = 'bold';
            button.style.minWidth = '30px';

            button.addEventListener('click', function () {
                if (config.value) {
                    document.execCommand(config.command, false, '<' + config.value + '>');
                } else {
                    document.execCommand(config.command, false, null);
                }
                targetElement.focus();
            });

            button.addEventListener('mouseover', function () {
                this.style.backgroundColor = '#e0e0e0';
            });

            button.addEventListener('mouseout', function () {
                this.style.backgroundColor = '#fff';
            });

            return button;
        }

        // 同步内容到textarea
        function syncContent() {
            textarea.value = editorContent.innerHTML;
        }

        editorContent.addEventListener('input', syncContent);
        editorContent.addEventListener('blur', syncContent);

        // 组装编辑器
        editorContainer.appendChild(toolbar);
        editorContainer.appendChild(editorContent);

        // 插入到textarea后面
        textarea.parentNode.insertBefore(editorContainer, textarea.nextSibling);

        // 创建编辑器实例对象
        const editorInstance = {
            getData: function () {
                return editorContent.innerHTML;
            },
            setData: function (data) {
                editorContent.innerHTML = data;
                textarea.value = data;
            },
            element: editorContent,
            destroy: function () {
                editorContainer.remove();
                textarea.style.display = '';
            }
        };

        // 存储实例
        this.instances[elementId] = editorInstance;

        return editorInstance;
    }
};

// 自动初始化
document.addEventListener('DOMContentLoaded', function () {
    // 触发自定义事件，表示CKEditor已加载
    setTimeout(function () {
        const event = new CustomEvent('ckeditorReady');
        document.dispatchEvent(event);
    }, 100);
});