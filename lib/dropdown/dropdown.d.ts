/// <reference types="react" />
import React from 'react';
export interface T {
    title: string;
    key: number | '';
    capital?: string[];
}
export interface MyProps {
    data: any[];
    className?: string;
    style?: React.CSSProperties;
    filter?: boolean;
    callBack?: (item: T) => void;
    setFields?: {
        key: string;
        title: string;
    };
    prePend?: object;
    title?: string;
}
export interface MyStates {
    visible: boolean;
    data: T[];
    dataTmp: T[];
    title?: string;
    page: number;
}
export default class  extends React.Component<MyProps, MyStates> {
    pageNum: number;
    t: any;
    allData: T[];
    defaultCls: string;
    constructor(props: MyProps);
    componentWillReceiveProps(props: MyProps): void;
    componentDidMount(): void;
    handleAllData(data: any[]): void;
    handleEnter(): void;
    handleLeave(): void;
    handleClick(item: {
        key: number;
        title: string;
    }): void;
    handleChange(): void;
    render(): JSX.Element;
}
