# SpEL类型相关语法

## 类类型表达式

使用`T(Type)`来表示`java.lang.Class`实例，Type必须是类全限定名，`java.lang`包除外，即该包下的类可以不指定包名；使用类类型表达式还可以进行访问类静态方法及类静态字段。

## 类实例化

类实例化同样使用java关键字`new`，类名必须是全限定名，但`java.lang`
包内的类型除外。如String、Integer可写成`new String('java')`和`new Integer()`，其他包的则必须写成`new java.util.Date()`。

## instanceof表达式

SpEL支持instanceof运算符，跟Java内使用同义；如`'java' instanceof T(String)`将返回true。

## 变量定义及引用

在表达式中使用`#variable`引用自定义变量，使用`#root`引用根对象，使用
`#this`引用当前上下文对象。

## 自定义函数

表达式解析可调用上下文注册的静态方法，如：

```java
StandardEvaluationContext context = new StandardEvaluationContext();
Method parseInt = Integer.class.getDeclaredMethod("parseInt", String.class);
context.registerFunction("parseInt1", parseInt);
```

注册`parseInt1`方法后，可使用`#parseInt1('1')`调用parseInt()方法，得到结果为`1`。

## 安全导航表达式

对象属性获取非常简单，即使用如`a.property.property`
这种点缀式获取，SpEL对于属性名首字母是不区分大小写的。但是，对于map，则需要写成`map[property][property]`
的形式，除非在上下文中配置PropertyAccessor。如：

```java
context.addPropertyAccessor(new MapAccessor());
```

这样就可通过`map.property.property`访问属性，MapAccessor在访问map时，如果property不是map的key或key对应的值为null，仍然会抛出异常。

SpEL还引入了Groovy语言中的安全导航运算符`(对象|属性)?.属性`，用来避免`?.`前边的表达式为null时抛出空指针异常，直接返回null。

## 对象方法调用

对象方法调用更简单，跟Java语法一样；如`'java'.substring(2,4)`将返回`va`；而对于根对象可以直接调用方法。

## Bean引用

SpEL支持使用`@`符号来引用Bean，在引用Bean时需要使用BeanResolver接口实现来查找Bean，Spring提供BeanFactoryResolver实现。
