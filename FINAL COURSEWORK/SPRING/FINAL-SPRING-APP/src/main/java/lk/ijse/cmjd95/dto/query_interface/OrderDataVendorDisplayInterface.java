package lk.ijse.cmjd95.dto.query_interface;

import lk.ijse.cmjd95.entity.OrderItemVendorDisplay;

import java.util.Date;

public interface OrderDataVendorDisplayInterface {
    String getCustomerEmail();

    Date getOrderDate();

    OrderItemVendorDisplay[] getOrders();

    String getState();
}
