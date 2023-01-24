# МОДУЛЬ ПРИЛОЖЕНИЯ «ПОКУПКА И ПРОДАЖА АКЦИЙ»
Были изучены возможности применения фреймворка Vue (https://v3.ru.vuejs.org/ru/) для разработки интерфейсов пользователя web-приложений и организации E2E тестирования клиентской части приложения.
## Задание.
Необходимо создать web-приложение, обеспечивающее работу брокера, у него есть запас денежных средств, он имеет возможность купить или продать акции (любое доступное количество), а также контролировать изменение котировок акций. В приложении должен отображаться баланс (запас денежных средств плюс стоимость акций), а также прибыль или убыток, которые он получил по каждой акции. Основные требования следующие:
1. Приложение получает исходные данные из [модуля администрирования приложения «Биржа акций»](https://github.com/youngwow/securities-exchange-api) в виде настроек в формате JSON-файла и в виде данных от web-сокета по изменению стоимости акций во времени.
2. В качестве сервера используется NestJS.
3. Участники торгов подключаются к приложению «Покупка и продажа акций».
4. Предусмотрена HTML-страница администратора, на которой отображается перечень участников. Для каждого участника отображается его баланс, количество акций каждого типа у каждого участника и его прибыль или убыток по каждой акции в текущий момент времени.
5. Предусмотрена HTML-страница входа в приложение, где каждый
участник указывает (или выбирает из допустимых) свое имя.
6. Предусмотрена HTML-страница, на которой участнику отображаются:
– текущая имитируемая дата;
– текущая стоимость каждой из акций, выставленных на торги;
– общее количество доступных средств;
– количество, стоимость и прибыль/убыток по каждой купленной акции.
На этой же странице у брокера есть возможность:
– открыть диалоговое окно просмотра графика изменения цены каждой акции (с момента начала торгов до текущего момента) с учётом сообщений об изменении стоимости акций;
– купить/продать интересующее его количество акций.
Комментарии:
– брокер не может купить акции, если денег не хватает;
– купля/продажа происходит «мгновенно».
7. Разработаны автоматизированные тесты для проверки корректности работы клиентской части web-приложения с использованием headlessбраузера или фреймворка Selenium. Как минимум необходимо проверить, что при покупке/продаже N акций в определённую дату соответствующим образом изменяется баланс средств брокера и через некоторое время получается правильная прибыль/убыток по данной акции.

Преимуществом будет использовать Material Design Framework
(https://vuetifyjs.com/en).

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
