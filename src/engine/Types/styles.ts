
type Gradient = {
    steps: Map<number, string>
}
type StyleColor = string;
type StyleOpacity = number;
type StyleStrokeSize = number;

type Pallete = {
    id: string,
    color?: { [key: string]: string | Gradient },

}
type ObjectStyle = {
    fill?: [StyleColor,StyleOpacity?],
    stroke?: [StyleColor,StyleStrokeSize?,StyleOpacity?],
    opacity?: StyleOpacity
}
type TextStyle = {
    family: string,
    letterSpacing: number
} & ObjectStyle

type StyleLayout = {
    name: string,
    styles: { [key: string]: ObjectStyle | TextStyle }
}
export {
    Pallete,
    ObjectStyle,
    TextStyle,
    StyleLayout,
    Gradient

}