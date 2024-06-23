import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: ` <footer>
    <div class="footer">
      <!-- <div class=" titulo d-flex align-items-center justify-content-center">
        <div >
          <h1>Tienda delacteos San Jose de porcon</h1>
        </div>
        <div>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo
            reiciendis maiores, culpa minima natus rerum, odio autem adipisci quia
            soluta ab, minus accusamus! Itaque optio quidem dolore minima facere
            unde.
          </p>
        </div>
      </div> -->

      <div class="row">
        <h5>Acerca de:</h5>
        <p>empresa de lacteos etc etc etc</p>
      </div>

      <div class="text-center">
        Asociacion de productores Copyright © 2024 - Derechos reservados || Grupo 1 ing. sofware
      </div>
    </div>
  </footer>`,
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
