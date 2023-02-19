package lk.ijse.cmjd95.dto.query_interface;

import lk.ijse.cmjd95.entity.OrderItem;

import java.util.Date;

public interface OrderDataInterface {
    public String getOrderId();

    public String getCustomerEmail();

    public String getCustomerName();

    public String getCustomerAddress();

    public String getCustomerPhoneNumber();
    public Date getOrderDate();

    public String getOrderDescription();

    public OrderItem[] getOrders();
    public Double getTotalPrice();

    public String getPaymentMethod();

    public String getState();

}
