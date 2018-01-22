/// <reference types="react" />
import React from 'react';
export interface T {
    title: string;
    key: number | '';
    capital?: string[];
}
export interface MyProps {
    data: any[];
    onSelect?: (value: string) => any;
    className?: string;
    placeholder?: string;
    style?: React.CSSProperties;
    setFields?: {
        key: string;
        title: string;
    };
}
export interface MyStates {
    data: T[];
    dataTmp: T[];
    page: number;
    visible: boolean;
    hover: boolean;
}
declare class AutoComplete extends React.Component<MyProps, MyStates> {
    pageNum: number;
    allData: T[];
    defaultCls: string;
    constructor(props: MyProps);
    componentWillReceiveProps(props: MyProps): void;
    componentDidMount(): void;
    handleAllData(data: any[]): void;
    searchChange(): void;
    searchShow(): void;
    handleSelect(item: any): void;
    listenScroll(): void;
    render(): JSX.Element;
}
export default AutoComplete;
