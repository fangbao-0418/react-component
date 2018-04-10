/// <reference types="jquery" />
/// <reference path="../types/ali-oss/index" />
interface JQuery<TElement extends Node = HTMLElement> extends Iterable<TElement> {
  lettering?: () => this
}