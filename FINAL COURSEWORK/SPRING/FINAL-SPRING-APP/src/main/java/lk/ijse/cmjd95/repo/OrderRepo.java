package lk.ijse.cmjd95.repo;

import lk.ijse.cmjd95.dto.query_interface.OrderDataInterface;
import lk.ijse.cmjd95.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableMongoRepositories
public interface OrderRepo extends MongoRepository<Order, String> {
    @Query("{orderDescription: {$regex: '?0'}}")
    Page<OrderDataInterface> getOrdersByDescription(String searchText, Pageable pageable);

    @Query(value = "{orderDescription: {$regex: '?0'}}", count = true)
    int getOrdersCountByDescription(String searchText);

    @Query(value = "{customerEmail: '?0'}",sort = "{orderDate: -1}")
    Page<OrderDataInterface> getOrdersByCustomerEmail(String searchText, Pageable pageable);

    @Query(value = "{customerEmail: '?0'}", count = true)
    int getOrdersCountByCustomerEmail(String searchText);

    @Query("{orderDate:{$date: '?0'}}")
    Page<OrderDataInterface> getOrdersByDate(String date, Pageable pageable);

    @Query(value = "{orderDate:{$date: '?0'}}", count = true)
    int getOrdersCountByDate(String date);

    @Query("{customerEmail: '?0', orderId: '?1'}")
    Page<OrderDataInterface> getOrdersByCustomerEmailAndOrderId(String email, String id, Pageable pageable);

    @Query(value = "{customerEmail: '?0', orderId: '?1'}", count = true)
    int getOrdersCountByCustomerEmailAndOrderId(String email, String id);

    @Query("{customerEmail: '?0', orderDescription: {$regex: '?1'}}")
    Page<OrderDataInterface> getOrdersByCustomerEmailAndOrderDescription(String email, String description, Pageable pageable);

    @Query(value = "{customerEmail: '?0', orderDescription: {$regex: '?1'}}", count = true)
    int getOrdersCountByCustomerEmailAndOrderDescription(String email, String description);

    @Query("{customerEmail: '?0',orderDate: {$date: '?1'}}")
    Page<OrderDataInterface> getOrdersByCustomerEmailAndOrderDate(String email, String orderDate, Pageable pageable);

    @Query(value = "{customerEmail: '?0',orderDate: {$date: '?1'}}", count = true)
    int getOrdersCountByCustomerEmailAndOrderDate(String email, String orderDate);

}
