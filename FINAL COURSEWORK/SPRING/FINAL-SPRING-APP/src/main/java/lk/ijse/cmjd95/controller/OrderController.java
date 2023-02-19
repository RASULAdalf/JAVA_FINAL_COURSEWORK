package lk.ijse.cmjd95.controller;

import lk.ijse.cmjd95.dto.request.OrderRequestDto;
import lk.ijse.cmjd95.service.OrderService;
import lk.ijse.cmjd95.util.StandardResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Max;
import java.text.ParseException;
import java.text.SimpleDateFormat;

@RestController
@RequestMapping("api/v1/order")
@CrossOrigin
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<StandardResponse> save(@RequestBody OrderRequestDto dto, @RequestHeader String token) throws ParseException {
        return new ResponseEntity<>(new StandardResponse(201, "Item Saved!", orderService.saveOrder(dto, token)), HttpStatus.CREATED);

    }

    @GetMapping(path = "/findById", params = {"searchText", "page", "pageSize"})
    public ResponseEntity<StandardResponse> findById(@RequestParam("searchText") String searchText, @RequestParam("page") int page, @RequestParam("pageSize") @Max(50) int pageSize, @RequestHeader String token) {
        return new ResponseEntity<>(new StandardResponse(200, "Item Found!", orderService.findOrderById(searchText, page, pageSize, token)), HttpStatus.OK);
    }

    @GetMapping(path = "/findByEmail", params = {"searchText", "page", "pageSize"})
    public ResponseEntity<StandardResponse> findByEmail(@RequestParam("searchText") String searchText, @RequestParam("page") int page, @RequestParam("pageSize") @Max(50) int pageSize, @RequestHeader String token) {
        return new ResponseEntity<>(new StandardResponse(200, "Item Found!", orderService.findOrderByEmail(searchText, page, pageSize, token)), HttpStatus.OK);
    }

    @GetMapping(path = "/findByDescription", params = {"searchText", "page", "pageSize"})
    public ResponseEntity<StandardResponse> findByDescription(@RequestParam("searchText") String searchText, @RequestParam("page") int page, @RequestParam("pageSize") @Max(50) int pageSize, @RequestHeader String token) {
        return new ResponseEntity<>(new StandardResponse(200, "Item Found!", orderService.findOrderByDescription(searchText, page, pageSize, token)), HttpStatus.OK);
    }

    @GetMapping(path = "/findByDate", params = {"searchText", "page", "pageSize"})
    public ResponseEntity<StandardResponse> findByDate(@RequestParam("searchText") String searchText, @RequestParam("page") int page, @RequestParam("pageSize") @Max(50) int pageSize, @RequestHeader String token) {

        return new ResponseEntity<>(new StandardResponse(200, "Item Found!", orderService.findOrderByDate(searchText, page, pageSize, token)), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<StandardResponse> update(@RequestBody OrderRequestDto dto, @RequestParam String id, @RequestHeader String token) {
        return new ResponseEntity<>(new StandardResponse(201, "Item Updated!", orderService.updateOrder(dto, id, token)), HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<StandardResponse> delete(@RequestParam String id, @RequestHeader String token) {
        orderService.deleteOrder(id, token);
        return new ResponseEntity<>(new StandardResponse(200, "Item Deleted!", null), HttpStatus.OK);
    }

    @GetMapping(path = "/list", params = {"email", "page", "pageSize"})
    public ResponseEntity<StandardResponse> listAllOrdersByCustomerEmail(@RequestHeader String token, @RequestParam("email") String email, @RequestParam("page") int page, @RequestParam("pageSize") @Max(50) int pageSize) {
        return new ResponseEntity<>(new StandardResponse(200, "Items Fetched!", orderService.getAllOrdersByCustomerEmail(email, page, pageSize, token)), HttpStatus.OK);
    }

    @GetMapping(path = "/findByCustomerEmailAndOrderId", params = {"email", "searchText", "page", "pageSize"})
    public ResponseEntity<StandardResponse> listOrdersByCustomerEmailAndOrderId(@RequestParam("email") String email, @RequestParam("searchText") String searchText, @RequestParam("page") int page, @RequestParam("pageSize") @Max(50) int pageSize, @RequestHeader String token) {
        return new ResponseEntity<>(new StandardResponse(200, "Items Fetched!", orderService.findCustomerOrderById(searchText, email, page, pageSize, token)), HttpStatus.OK);
    }

    @GetMapping(path = "/findByCustomerEmailAndOrderDescription", params = {"email", "searchText", "page", "pageSize"})
    public ResponseEntity<StandardResponse> listOrdersByCustomerEmailAndOrderDescription(@RequestParam("email") String email, @RequestParam("searchText") String searchText, @RequestParam("page") int page, @RequestParam("pageSize") @Max(50) int pageSize, @RequestHeader String token) {
        return new ResponseEntity<>(new StandardResponse(200, "Items Fetched!", orderService.findCustomerOrderByDescription(searchText, email, page, pageSize, token)), HttpStatus.OK);
    }

    @GetMapping(path = "/findByCustomerEmailAndOrderDate", params = {"email", "searchText", "page", "pageSize"})
    public ResponseEntity<StandardResponse> listOrdersByCustomerEmailAndOrderDate(@RequestParam("email") String email, @RequestParam("searchText") String searchText, @RequestParam("page") int page, @RequestParam("pageSize") @Max(50) int pageSize, @RequestHeader String token) {
        return new ResponseEntity<>(new StandardResponse(200, "Items Fetched!", orderService.findCustomerOrderByDate(searchText, email, page, pageSize, token)), HttpStatus.OK);
    }
    @GetMapping(path = "/findCustomerOrder", params = {"email", "searchText", "page", "pageSize"})
    public ResponseEntity<StandardResponse> findCustomerOrder(@RequestParam("email") String email, @RequestParam("searchText") String searchText, @RequestParam("page") int page, @RequestParam("pageSize") @Max(50) int pageSize, @RequestHeader String token) {
        return new ResponseEntity<>(new StandardResponse(200, "Items Fetched!", orderService.findCustomerOrder(searchText, email, page, pageSize, token)), HttpStatus.OK);
    }



}
