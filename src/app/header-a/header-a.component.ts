import { Component, HostListener } from '@angular/core';
import { DynamicLoaderService } from '../shared/dynamic-loader.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-header-a',
  imports: [],
  templateUrl: './header-a.component.html',
  styleUrls: ['./header-a.component.scss']
})
export class HeaderAComponent {
  title = 'Header A';
  isDropdownOpen = false;
  selectedOption: string = 'none';

  constructor(private dynamicLoaderService: DynamicLoaderService, private dialog: MatDialog) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.isDropdownOpen = false;
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.ctrlKey && event.shiftKey && event.key === 'M') {
      event.preventDefault(); // Ngăn trình duyệt xử lý hotkey
      this.toggleDropdown(); // Mở dropdown menu
    }
  }

  onOptionChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).textContent?.trim() || 'none';

    const message = selectedValue === 'none'
      ? 'App đang mở, bạn có muốn đóng không?'
      : `Bạn có chắc là sẽ chuyển sang app: ${selectedValue}?`;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Tiếng Nhật IT',
        message: message
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        this.selectedOption = selectedValue;
        this.dynamicLoaderService.loadComponent(selectedValue);
      } else {
        // Reset the dropdown to the previous value or default
        (event.target as HTMLSelectElement).value = this.selectedOption;
      }
    });
  }
}
