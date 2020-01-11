/**
 * TODO
 * - default data
 * - validate data
 * - throw errors
 */

export default class Hint {

    constructor(params) {
        this.hintNode = null;
        this.closeBtn = null;
        this.target = params.hint.target;
        this.name =  params.hint.name
        this.blocks = params.hint.blocks;
        this.container = null;
        this.positionType = {
            'center': { top: '50%', bottom: 'unset', left: '50%', right: '0', transform: 'translateX(-50%) translateY(-50%)'},

            'inner-bottom-left': { top: 'unset', bottom: '0', left: '0', right: 'unset', transform: 'unset'},
            'inner-bottom-middle': { top: 'unset', bottom: '0', left: '50%', right: 'unset', transform: 'translateX(-50%);'},
            'inner-bottom-right': { top: 'unset', bottom: '0', left: 'unset', right: '0', transform: 'unset'},
            'inner-top-left': { top: '0', bottom: 'unset', left: '0', right: 'unset', transform: 'unset'},
            'inner-top-middle': { top: '0', bottom: 'unset', left: '50%', right: 'unset', transform: 'translateX(-50%);'},
            'inner-top-right': { top: '0', bottom: 'unset', left: 'unset', right: '0', transform: 'unset'},
            'inner-left-top': { top: '0', bottom: 'unset', left: '0', right: 'unset', transform: 'unset'},
            'inner-left-middle': { top: '50%', bottom: 'unset', left: '0', right: 'unset', transform: 'translateY(-50%);'},
            'inner-left-bottom': { top: 'unset', bottom: '0', left: '0', right: 'unset', transform: 'unset'},
            'inner-right-top': { top: '0', bottom: 'unset', left: 'unset', right: '0', transform: 'unset'},
            'inner-right-middle': { top: '50%', bottom: 'unset', left: 'unset', right: '0', transform: 'translateY(-50%);'},
            'inner-right-bottom': { top: 'unset', bottom: '0', left: 'unset', right: '0', transform: 'unset'},

            'outter-bottom-left': { top: '100%', bottom: 'unset', left: 'unset', right: '100%', transform: 'unset'},
            'outter-bottom-middle': { top: '100%', bottom: 'unset', left: '50%', right: 'unset', transform: 'translateX(-50%);'},
            'outter-bottom-right': { top: '100%', bottom: 'unset', left: '100%', right: 'unset', transform: 'unset'},
            'outter-top-left': { top: 'unset', bottom: '100%', left: 'unset', right: '100%', transform: 'unset'},
            'outter-top-middle': { top: 'unset', bottom: '100%', left: '50%', right: 'unset', transform: 'translateX(-50%);'},
            'outter-top-right': { top: 'unset', bottom: '100%', left: '100%', right: 'unset', transform: 'unset'},
            'outter-left-top': { top: 'unset', bottom: '100%', left: 'unset', right: '100%', transform: 'unset'},
            'outter-left-middle': { top: '50%', bottom: 'unset', left: 'unset', right: '100%', transform: 'translateY(-50%);'},
            'outter-left-bottom': { top: '100%', bottom: 'unset', left: 'unset', right: '100%', transform: 'unset'},
            'outter-right-top': { top: 'unset', bottom: '100%', left: '100%', right: 'unset', transform: 'unset'},
            'outter-right-middle': { top: '50%', bottom: 'unset', left: '100%', right: 'unset', transform: 'translateY(-50%);'},
            'outter-right-bottom': { top: '100%', bottom: 'unset', left: '100%', right: 'unset', transform: 'unset'},
        };

        /**
         * INIT
         */
        this._findContainer();
        if(this._validateContainer()) {
            this._mountElement()
            this._onClose();
        }
    }

    /**
     * RENDER HINT COMPONENT
     */
    _createHint() {
        return (
            `<div class="hint" style="${this._getHintPositionStyles()}" data-hint="${this.target}">
                <i class="material-icons hint__close" data-hint-close="${this.target}" >close</i>
                <h3 class="hint__topic">${this.name}</h3> 
                ${this._renderHintBlocks(this.blocks)}
            </div>`
        )
    }

    _renderArticles(articles) {
        return articles.map(article => (
            `<li class="hint__article">
                <i class="material-icons hint__icon">${article.icon}</i>
                <img class="hint__icon" src="${article.image}">
                <p>${article.text}</p>
            </li>`
        )).join('');
    }

    _renderHintBlocks(blocks) {
        return blocks.map(block => (
            `<div class="hint__block">
                <h4 class="hint__title">${block.title}</h4>
                <ul class="hint__articles">
                    ${this._renderArticles(block.articles)}
                </ul>
            </div>`
        )).join('')
    }

    /**
     * Get position styles
     */
    _getHintPositionStyles() {
        let position = this.positionType[this.container.getAttribute('data-hint-position')]

        // default
        position = position || this.positionType['inner-bottom-left']

        return (`top: ${position.top}; bottom: ${position.bottom}; left: ${position.left}; right: ${position.right}; transform: ${position.transform};`)
    }

    /**
     * Find container
     */
    _findContainer() {
        this.container = document.querySelector(`[data-hint-attachment="${this.target}"]`);
    }

    /**
     * Validation
     */
    _validateContainer() {
        return this.container;
    }

    /**
     * TODO
     */
    _validateIncomingData() {}

    /**
     * Default events
     */
    _onClose() {
        const self = this;

        if(self.closeBtn) {
            self.closeBtn.addEventListener('click', () => {
                self._removeHint();
            })
        }
    }

    /**
     * Insert into DOM
     */
    _mountElement() { 
        const hint = this._createHint();

        this.container.style.position = 'relative';

        this.container.insertAdjacentHTML('afterbegin', hint)

        this.hintNode = document.querySelector(`[data-hint="${this.target}"]`);
        this.closeBtn = document.querySelector(`[data-hint-close="${this.target}"]`);
    }

    /**
     * Remove hint node from DOM
     */
    _removeHint() {
        if(this.hintNode) {
            this.hintNode.parentNode.removeChild(this.hintNode)
        }
    }

    /**
     * PUBLIC METHODS
     */
    close(callback) {
        const self = this;

        // like listener
        if(callback) {
            if(self.closeBtn) {
                self.closeBtn.addEventListener('click', () => {
                    callback && callback();
                })
            }
        } else { // like method
            self._removeHint();
        }
        
    }

    /**
     * TODO
     */
    show() {}
    hide() {}

}