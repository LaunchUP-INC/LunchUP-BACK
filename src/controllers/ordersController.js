const { Order } = require("../db");
// const { NotFoundError } = require("../errors/customErrors");

const getOrders = async (id) => {
  const orders = await Order.findAll({
    where: { UserId: id }, 
    attributes: ['id', 'items', 'totalPrice', 'status', 'createdAt'],
    order: [['createdAt', 'DESC']], // Ordenar por fecha de creación descendente
  });

  if (!orders || orders.length === 0) {
    throw new Error("No se encontraron ordenes para el usuario");
  }

  return orders;
};

module.exports = { getOrders };