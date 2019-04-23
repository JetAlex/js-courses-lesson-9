/*
## Добавить геттер для power
Добавьте кофеварке геттер для приватного свойства power, чтобы внешний код мог узнать мощность кофеварки.

Исходный код:

```javascript
function CoffeeMachine(power, capacity) {
	//...
	this.setWaterAmount = function(amount) {
		if (amount < 0) {
			throw new Error("Значение должно быть положительным");
		}
		if (amount > capacity) {
			throw new Error("Нельзя залить воды больше, чем " + capacity);
		}
		waterAmount = amount;
	};

	this.getWaterAmount = function() {
		return waterAmount;
	};
}
```

Здесь это означает, что мощность power можно указать лишь при создании кофеварки и в
дальнейшем её можно прочитать, но нельзя изменить.
*/

function CoffeeMachine(power, capacity) {
  this.power = power;

  this.getPower = function() {
    return this.power;
  }

  this.setWaterAmount = function(amount) {
    if (amount < 0) {
      throw new Error("Значение должно быть положительным");
    }
    if (amount > capacity) {
      throw new Error("Нельзя залить воды больше, чем " + capacity);
    }
    waterAmount = amount;
  };

  this.getWaterAmount = function() {
    return waterAmount;
  };
}

