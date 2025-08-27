const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../utils/database');

const Peluche = sequelize.define('Peluche', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El nombre del peluche es obligatorio'
      },
      len: {
        args: [2, 100],
        msg: 'El nombre debe tener entre 2 y 100 caracteres'
      }
    }
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: {
        args: [0, 1000],
        msg: 'La descripción no puede exceder los 1000 caracteres'
      }
    }
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: {
        msg: 'El precio debe ser un número decimal válido'
      },
      min: {
        args: [0],
        msg: 'El precio no puede ser negativo'
      }
    }
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      isInt: {
        msg: 'El stock debe ser un número entero'
      },
      min: {
        args: [0],
        msg: 'El stock no puede ser negativo'
      }
    }
  },
  imagen: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isUrl: {
        msg: 'La imagen debe ser una URL válida'
      }
    }
  },
  categoria: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'La categoría es obligatoria'
      },
      isIn: {
        args: [['Osos', 'Unicornios', 'Perros', 'Gatos', 'Conejos', 'Otros']],
        msg: 'La categoría debe ser una de las opciones válidas'
      }
    }
  }
}, {
  tableName: 'peluches',
  timestamps: true,
  indexes: [
    {
      fields: ['categoria']
    },
    {
      fields: ['precio']
    }
  ]
});

// Hooks del modelo
Peluche.beforeValidate((peluche) => {
  // Limpiar espacios en blanco
  if (peluche.nombre) {
    peluche.nombre = peluche.nombre.trim();
  }
  if (peluche.descripcion) {
    peluche.descripcion = peluche.descripcion.trim();
  }
  if (peluche.categoria) {
    peluche.categoria = peluche.categoria.trim();
  }
});

module.exports = Peluche;