package lk.ijse.cmjd95.dto.query_interface;

import lk.ijse.cmjd95.entity.OrderItem;

import java.util.Date;

public interface OrderDataCustomerDisplayInterface {
    String getOrderId();

    String getCustomerEmail();

    String getCustomerName();

    String getCustomerAddress();

    String getCustomerPhoneNumber();

    Date getOrderDate();

    String getOrderDescription();

    OrderItem[] getOrders();

    Double getTotalPrice();

    String getPaymentMethod();

    String getState();

}
