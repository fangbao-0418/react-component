/// <reference types="jquery" />

interface JQuery<TElement extends Node = HTMLElement> extends Iterable<TElement> {
  lettering?: () => this
}