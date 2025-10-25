import { lockScroll, unlockScroll } from "./utils.js";

export default class Modal {
    #closeBtn = null;
    #modal = null;
    #handleEscEvent = null;
    #handleCloseBtnClick = null;
    #handleOverlayClick = null;
    #isOpen = false;

    constructor(modalSelector, closeBtnSelector) {
        console.log(modalSelector, closeBtnSelector);
        
        this.#modal = modalSelector;
        this.#closeBtn = closeBtnSelector;
        
        if (!this.#modal || !this.#closeBtn) {
            console.warn(`Modal или closeBtn не найдены: ${modalSelector}`);
            return;
        }
        
        this.init();
    }

    init() {
        // Создаём и сохраняем ссылки на обработчики
        this.#handleCloseBtnClick = () => this.close();
        this.#handleOverlayClick = (e) => {
            if (e.target === this.#modal) this.close();
        };
        this.#handleEscEvent = (evt) => {
            if (evt.key === 'Escape' && this.#isOpen) this.close();
        };
        
        // Устанавливаем слушатели
        this.#closeBtn.addEventListener('click', this.#handleCloseBtnClick);
        this.#modal.addEventListener('click', this.#handleOverlayClick);
    }

    open() {
        if (this.#isOpen) return;
        
        this.#modal.display = 'block';
        lockScroll();
        this.#isOpen = true;
        
        document.addEventListener('keydown', this.#handleEscEvent);
    }

    close() {
        if (!this.#isOpen) return;
        
        this.#modal.display = '';
        unlockScroll();
        this.#isOpen = false;
        
        document.removeEventListener('keydown', this.#handleEscEvent);
    }

    toggle() {
        this.#isOpen ? this.close() : this.open();
    }

    destroy() {
        this.close();
        this.#closeBtn.removeEventListener('click', this.#handleCloseBtnClick);
        this.#modal.removeEventListener('click', this.#handleOverlayClick);
        document.removeEventListener('keydown', this.#handleEscEvent);
    }
}