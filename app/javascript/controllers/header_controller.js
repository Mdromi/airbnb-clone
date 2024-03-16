import { Controller } from '@hotwired/stimulus'
import { toggle } from 'el-transition'

export default class extends Controller {
  static targets = ['openUserMenu', 'userSignUpLink', 'userLoginLink'];

  connect() {
    this.openUserMenuTarget.addEventListener('click', this.toggleDropdownMenu.bind(this));
    this.userSignUpLinkTarget.addEventListener('click', this.openModal.bind(this, 'user-SignUpAuth-modal-trigger'));
    this.userLoginLinkTarget.addEventListener('click', this.openModal.bind(this, 'user-loginAuth-modal-trigger'));
  }

  openModal(triggerId, e) {
    e.preventDefault();
    document.getElementById(triggerId).click();
  }

  toggleDropdownMenu() {
    toggle(document.getElementById('menu-dropdown-items'));
  }
}
