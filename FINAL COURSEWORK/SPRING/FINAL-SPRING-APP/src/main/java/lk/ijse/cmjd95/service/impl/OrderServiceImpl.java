package lk.ijse.cmjd95.service.impl;

import lk.ijse.cmjd95.dto.paginate.PaginatedOrderResponseDto;
import lk.ijse.cmjd95.dto.request.OrderRequestDto;
import lk.ijse.cmjd95.dto.response.OrderResponseDto;
import lk.ijse.cmjd95.entity.Item;
import lk.ijse.cmjd95.entity.Order;
import lk.ijse.cmjd95.entity.OrderItem;
import lk.ijse.cmjd95.repo.ItemRepo;
import lk.ijse.cmjd95.repo.OrderRepo;
import lk.ijse.cmjd95.security.TokenValidator;
import lk.ijse.cmjd95.service.ItemService;
import lk.ijse.cmjd95.service.OrderService;
import lk.ijse.cmjd95.util.mapper.Mapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service

public class OrderServiceImpl implements OrderService {
    private final Mapper mapper;
    private final OrderRepo orderRepo;
    private final ItemService itemService;
    private final ItemRepo itemRepo;

    public OrderServiceImpl(Mapper mapper, OrderRepo orderRepo, final ItemService itemService, final ItemRepo itemRepo) {
        this.mapper = mapper;
        this.orderRepo = orderRepo;
        this.itemService = itemService;
        this.itemRepo = itemRepo;
    }


    @Override
    public String saveOrder(OrderRequestDto dto, String token) throws ParseException {
        if (!TokenValidator.validateToken(token)) {
            return "Invalid Token!";
        }
        for (OrderItem orderItem : dto.getOrders()) {
            Optional<Item> byId = itemRepo.findById(orderItem.getItemCode());
            if (!byId.isPresent()) {
                return "Invalid Item Code !";
            } else if (byId.get().getQtyOnHand() < orderItem.getQty()) {
                return "No enough stock !";
            }
            Item item = new Item(byId.get().getItemCode(), byId.get().getItemDescription(), byId.get().getItemCategory(), byId.get().getItemLogoUrl(), byId.get().getSlideShowImageUrls(), byId.get().getUnitPrice(), (byId.get().getQtyOnHand() - orderItem.getQty()), byId.get().getVendorEmail(), byId.get().getSpecsDocUrl(), byId.get().getSpecsDocContent());
            itemRepo.save(item);
        }

        return orderRepo.save(mapper.toOrder(dto)).getOrderId();
    }

    @Override
    public PaginatedOrderResponseDto findOrderById(String searchText, int page, int pageSize, String token) {
        if (!TokenValidator.validateToken(token)) {
            return null;
        }
        Optional<Order> byId = orderRepo.findById(searchText);
        if (byId.isPresent()) {
            List<OrderResponseDto> list = new ArrayList<>();
            list.add(mapper.toOrderResponseDto(byId.get()));
            return new PaginatedOrderResponseDto(list, 1);
        } else {
            return new PaginatedOrderResponseDto(mapper.toOrderResponseDto(orderRepo.getOrdersByDescription(searchText, PageRequest.of(page, pageSize))), orderRepo.getOrdersCountByDescription(searchText));
        }
    }

    @Override
    public PaginatedOrderResponseDto findOrderByEmail(String searchText, int page, int pageSize, String token) {
        return getPaginatedOrderResponseDto(searchText, page, pageSize, token);
    }

    @Override
    public PaginatedOrderResponseDto findOrderByDescription(String searchText, int page, int pageSize, String token) {
        if (!TokenValidator.validateToken(token)) {
            return null;
        }
        PaginatedOrderResponseDto paginatedOrderResponseDto = new PaginatedOrderResponseDto(mapper.toOrderResponseDto(orderRepo.getOrdersByDescription(searchText, PageRequest.of(page, pageSize))), orderRepo.getOrdersCountByDescription(searchText));
        if (0 < paginatedOrderResponseDto.getOrders().size()) {
            return paginatedOrderResponseDto;
        } else {
            return null;
        }
    }

    @Override
    public PaginatedOrderResponseDto findOrderByDate(String searchText, int page, int pageSize, String token) {
        if (!TokenValidator.validateToken(token)) {
            return null;
        }
        PaginatedOrderResponseDto paginatedOrderResponseDto = new PaginatedOrderResponseDto(mapper.toOrderResponseDto(orderRepo.getOrdersByDate(searchText, PageRequest.of(page, pageSize))), orderRepo.getOrdersCountByDate(searchText));
        System.out.println(searchText);
        if (0 < paginatedOrderResponseDto.getOrders().size()) {
            return paginatedOrderResponseDto;
        } else {
            return null;
        }

    }

    @Override
    //@Transactional
    public String updateOrder(OrderRequestDto dto, String id, String token) {
        if (!TokenValidator.validateToken(token)) {
            return "Invalid Token!";
        }
        Optional<Order> byId = orderRepo.findById(id);
        if (byId.isPresent()) {
            for (OrderItem orderItem : byId.get().getOrders()) {
                Optional<Item> byId1 = itemRepo.findById(orderItem.getItemCode());
                if (!byId1.isPresent()) {
                    return "Invalid Item Code !";
                }
                byId1.get().setQtyOnHand(byId1.get().getQtyOnHand() + orderItem.getQty());
            }
            for (OrderItem orderItem : dto.getOrders()) {
                Optional<Item> byId1 = itemRepo.findById(orderItem.getItemCode());
                if (!byId1.isPresent()) {
                    return "Invalid Item Code!";
                } else if (byId1.get().getQtyOnHand() < orderItem.getQty()) {
                    return "No enough stock !";
                }
                Item item = new Item(byId1.get().getItemCode(), byId1.get().getItemDescription(), byId1.get().getItemCategory(), byId1.get().getItemLogoUrl(), byId1.get().getSlideShowImageUrls(), byId1.get().getUnitPrice(), (byId1.get().getQtyOnHand() - orderItem.getQty()), byId1.get().getVendorEmail(), byId1.get().getSpecsDocUrl(), byId1.get().getSpecsDocContent());
                itemRepo.save(item);
            }

        }
        Order order = mapper.toOrder(dto);
        order.setOrderId(byId.get().getOrderId());
        return orderRepo.save(order).getOrderId();
    }


    @Override
    //@Transactional
    public void deleteOrder(String id, String token) {
        if (!TokenValidator.validateToken(token)) {
            return;
        }
        Optional<Order> byId = orderRepo.findById(id);
        if (byId.isPresent()) {
            for (OrderItem orderItem : byId.get().getOrders()) {
                Optional<Item> byId1 = itemRepo.findById(orderItem.getItemCode());
                if (!byId1.isPresent()) {
                    return;
                }
                byId1.get().setQtyOnHand(byId1.get().getQtyOnHand() + orderItem.getQty());
            }
            orderRepo.deleteById(id);
        }
    }

    @Override
    public PaginatedOrderResponseDto getAllOrdersByCustomerEmail(String searchText, int page, int pageSize, String token) {
        return getPaginatedOrderResponseDto(searchText, page, pageSize, token);
    }

    @Override
    public PaginatedOrderResponseDto findCustomerOrderById(String searchText, String email, int page, int pageSize, String token) {
        if (!TokenValidator.validateToken(token)) {
            return null;
        }
        return new PaginatedOrderResponseDto(mapper.toOrderResponseDto(orderRepo.getOrdersByCustomerEmailAndOrderId(email, searchText, PageRequest.of(page, pageSize))), orderRepo.getOrdersCountByCustomerEmailAndOrderId(email, searchText));
    }

    @Override
    public PaginatedOrderResponseDto findCustomerOrderByEmail(String searchText, String email, int page, int pageSize, String token) {
        if (!TokenValidator.validateToken(token)) {
            return null;
        }
        return new PaginatedOrderResponseDto(mapper.toOrderResponseDto(orderRepo.getOrdersByCustomerEmail(email, PageRequest.of(page, pageSize))), orderRepo.getOrdersCountByCustomerEmail(email));
    }

    @Override
    public PaginatedOrderResponseDto findCustomerOrderByDescription(String searchText, String email, int page, int pageSize, String token) {
        if (!TokenValidator.validateToken(token)) {
            return null;
        }
        return new PaginatedOrderResponseDto(mapper.toOrderResponseDto(orderRepo.getOrdersByCustomerEmailAndOrderDescription(email, searchText, PageRequest.of(page, pageSize))), orderRepo.getOrdersCountByCustomerEmailAndOrderDescription(email, searchText));
    }

    @Override
    public PaginatedOrderResponseDto findCustomerOrderByDate(String searchText, String email, int page, int pageSize, String token) {
        if (!TokenValidator.validateToken(token)) {
            return null;
        }
        return new PaginatedOrderResponseDto(mapper.toOrderResponseDto(orderRepo.getOrdersByCustomerEmailAndOrderDate(email, searchText, PageRequest.of(page, pageSize))), orderRepo.getOrdersCountByCustomerEmailAndOrderDate(email, searchText));

    }

    @Override
    public PaginatedOrderResponseDto findCustomerOrder(String searchText, String email, int page, int pageSize, String token) {
        if (!TokenValidator.validateToken(token)){
            return null;
        }
        List<OrderResponseDto> ordersList = new ArrayList<>();

        PaginatedOrderResponseDto customerOrderById = findCustomerOrderById(searchText, email, page, pageSize, token);
        //System.out.println("out");
        if (customerOrderById.getDataCount()>0){
           // System.out.println("in");
            for (OrderResponseDto dto: customerOrderById.getOrders()){
                ordersList.add(dto);
            }
        }

        PaginatedOrderResponseDto customerOrderByDescription = findCustomerOrderByDescription(searchText, email, page, pageSize, token);
        if (customerOrderByDescription.getDataCount()>0){
            for (OrderResponseDto dto: customerOrderByDescription.getOrders()){
                ordersList.add(dto);
            }
        }

        PaginatedOrderResponseDto customerOrderByDate = findCustomerOrderByDate(searchText + "T18:30:00.000Z", email, page, pageSize, token);
        if (customerOrderByDate.getDataCount()>0){
            for (OrderResponseDto dto: customerOrderByDate.getOrders()){
                ordersList.add(dto);
            }
        }

        return new PaginatedOrderResponseDto(ordersList,ordersList.size());


    }

    private PaginatedOrderResponseDto getPaginatedOrderResponseDto(String searchText, int page, int pageSize, String token) {
        if (!TokenValidator.validateToken(token)) {
            return null;
        }
        PaginatedOrderResponseDto paginatedOrderResponseDto = new PaginatedOrderResponseDto(mapper.toOrderResponseDto(orderRepo.getOrdersByCustomerEmail(searchText, PageRequest.of(page, pageSize))), orderRepo.getOrdersCountByCustomerEmail(searchText));
        if (0 < paginatedOrderResponseDto.getOrders().size()) {
            return paginatedOrderResponseDto;
        } else {
            return null;
        }
    }
}
