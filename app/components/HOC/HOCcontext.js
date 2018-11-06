import createReactContext from 'create-react-context';

const Context = createReactContext();

const Provider = Context.Provider; // 包裹最外层的父组件
const Consumer = Context.Consumer; // 包裹父组件内想取得上下文所定义的共用元素的组件

export {
  Provider,
  Consumer,
};