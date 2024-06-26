# SpEL集合相关语法

## 内联List

从Spring3.0.4开始支持内联List，使用`{表达式,...}`定义内联List，如`{1,2,3}`将返回一个整型的ArrayList，而`{}`
将返回空的List，对于字面量表达式列表，SpEL会使用`java.util.Collections.unmodifiableList`方法将列表设置为不可修改。

## 内联数组

和Java 数组定义类似，只是在定义时进行多维数组初始化。如`new int[1][2][3]{ {1} {2} {3} }`。

## 集合字典元素访问

SpEL目前支持所有集合类型和字典类型的元素访问，使用`集合[索引]`访问集合元素，使用`map[key]`访问字典元素。

## 集合投影

在SpEL根据集合中的元素中通过函数转换来构造另一个集合，该集合和原集合具有相同数量的元素；SpEL使用`(list|map).![投影表达式]`
来进行投影运算。Map投影最终只能得到List结果，对于投影表达式中的`#this`将是Map.Entry，所以可以使用`value`来获取值，使用`key`
来获取键。

## 集合选择

在SpEL根据原集合中的元素通过条件表达式选择出满足条件的元素并构造为新的集合，SpEL使用`(list|map).?[选择表达式]`
，其中选择表达式结果必须是boolean类型，如果true则选择的元素将添加到新集合中，false将不添加到新集合中。

## 表达式模板

模板表达式就是由字面量与一个或多个表达式块组成。每个表达式块由`前缀+表达式+后缀`形式组成，如`${1+2}`
即表达式块。如`Error ${#v0} ${#v1}`
表达式表示由字面量`Error`、模板表达式`#v0`、模板表达式`#v1`组成，其中v0和v1表示自定义变量，需要在上下文定义。
