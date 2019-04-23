/*
## Добавить метод isRunning
Из внешнего кода мы хотели бы иметь возможность понять – запущена кофеварка или нет.

Для этого добавьте кофеварке публичный метод isRunning(), который будет возвращать true, если она запущена и false, если нет.

Нужно, чтобы такой код работал:

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

var coffeeMachine = new CoffeeMachine(20000, 500);
coffeeMachine.setWaterAmount(100);

console.log('До: ' + coffeeMachine.isRunning()); // До: false

coffeeMachine.run();

console.log('В процессе: ' + coffeeMachine.isRunning()); // В процессе: true

coffeeMachine.setOnReady(function() {
	console.log('После: ' + coffeeMachine.isRunning()); // После: false
});
```
*/

function CoffeeMachine(power, capacity) {
  var waterAmount = 0;
  var WATER_HEAT_CAPACITY = 4200;
  var machineIsRunning = false;
  var onReadyCb = onReadyDefault;

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
    machineIsRunning = false;
    onReadyCb();
  }

  function onReadyDefault() {
    console.log('Coffee is ready');
  }

  this.run = function() {
    machineIsRunning = true;
    setTimeout(onReady, getTimeToBoil());
  };

  this.isRunning = () => machineIsRunning;

  this.setOnReady = function(cb) {
    onReadyCb = (cb && typeof cb === 'function') ? cb : onReadyDefault;
  }
}

var coffeeMachine = new CoffeeMachine(20000, 500);
coffeeMachine.setWaterAmount(100);

console.log('До: ' + coffeeMachine.isRunning()); // До: false

coffeeMachine.run();

console.log('В процессе: ' + coffeeMachine.isRunning()); // В процессе: true

coffeeMachine.setOnReady(function() {
  console.log('После: ' + coffeeMachine.isRunning()); // После: false
});
