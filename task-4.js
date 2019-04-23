/*
## Создать сеттер для onReady
Обычно когда кофе готов, мы хотим что-то сделать, например выпить его.
Сейчас при готовности срабатывает функция onReady, но она жёстко задана в коде:

```javascript
function CoffeeMachine(power, capacity) {
	var waterAmount = 0;
	var WATER_HEAT_CAPACITY = 4200;

    function getTimeToBoil() {
		return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
    }

    this.setWaterAmount = function(amount) {
		if (amount < 0) {
			throw new Error("Значение должно быть положительным");
		}
		if (amount > capacity) {
			throw new Error("Нельзя залить больше, чем " + capacity);
		}
		waterAmount = amount;
	};

    function onReady() {
		console.log('Coffee is ready');
    }

	this.run = function() {
		setTimeout(onReady, getTimeToBoil());
	};
}
```

Создайте сеттер setOnReady, чтобы код снаружи мог назначить свой onReady, вот так:

```javascript
var coffeeMachine = new CoffeeMachine(20000, 500);
coffeeMachine.setWaterAmount(150);

coffeeMachine.setOnReady(function() {
	var amount = coffeeMachine.getWaterAmount();

	console.log( 'Готов кофе: ' + amount + 'мл' ); // Кофе готов: 150 мл
});

coffeeMachine.run();
```

P.S. *Значение onReady по умолчанию должно быть таким же, как и раньше.*

P.P.S. *Постарайтесь сделать так, чтобы setOnReady можно было вызвать не только до, но и после запуска кофеварки,
то есть чтобы функцию onReady можно было изменить в любой момент до её срабатывания.*

*/

function CoffeeMachine(power, capacity) {
  var waterAmount = 0;
  var WATER_HEAT_CAPACITY = 4200;
  var onReadyCb = onReadyDefault;

  function getTimeToBoil() {
    return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
  }

  this.getWaterAmount = () => waterAmount;

  this.setWaterAmount = function(amount) {
    if (amount < 0) {
      throw new Error("Значение должно быть положительным");
    }
    if (amount > capacity) {
      throw new Error("Нельзя залить больше, чем " + capacity);
    }
    waterAmount = amount;
  };

  function onReady() {
    onReadyCb();
  }

  function onReadyDefault() {
    console.log('Coffee is ready');
  }

  this.run = function() {
    setTimeout(onReady, getTimeToBoil());
  };

  this.setOnReady = function(cb) {
    onReadyCb = (cb && typeof cb === 'function') ? cb : onReadyDefault;
  }
}

var coffeeMachine = new CoffeeMachine(20000, 500);
coffeeMachine.setWaterAmount(150);

coffeeMachine.setOnReady(function() {
  var amount = coffeeMachine.getWaterAmount();

  console.log( 'Готов кофе: ' + amount + 'мл' ); // Кофе готов: 150 мл
});

coffeeMachine.run();
