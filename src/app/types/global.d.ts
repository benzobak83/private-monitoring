declare module '*/_export.module.scss' {
    interface IVariables {
        fontSizeS: string
        fontSizeM: string
        fontSizeL: string
        fontSizeXL: string
        fontSizeBtn: string
        primaryColor: string
        successColor: string
        greyColor: string
        errorColor: string
        warningColor: string
    }

    const variables: IVariables
    export = variables
}
declare module '*.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames
    export = classNames
}

declare module '*.svg' {
    const SVG: any
    export = SVG
}
declare module '*.png' {}
declare module '*.jpg' {}
declare module '*.jpeg' {}
