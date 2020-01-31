import { Component, Host, Prop, h } from '@stencil/core';
import Barcode from 'jsbarcode';
import { BarcodeTypes } from './types';

@Component({
  tag: 'bar-code',
  styleUrl: 'bar-code.css',
  shadow: true
})
export class BarCode {
  /**
   * Barcode type
   */
  @Prop() barcode: BarcodeTypes = 'auto';

  /**
   * Text
   */
  @Prop() text: string;

  protected svg: SVGElement;

  setSvg = elm => this.svg = elm;

  protected get options(): object {
    const { barcode } = this;
    return {
      ...(barcode === 'auto' ? null : { format: barcode })
    }
  }

  componentDidLoad() {
    this.updateBarcode();
  }

  componentDidUpdate() {
    this.updateBarcode();
  }

  protected updateBarcode() {
    if (this.svg === undefined) {
      return;
    }

    Barcode(this.svg, this.text, this.options);
  }

  render() {
    return <Host>
      <svg ref={this.setSvg}></svg>
    </Host>
  }
}

