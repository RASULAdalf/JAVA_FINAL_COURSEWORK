package lk.ijse.cmjd95.util.mapper;

import lk.ijse.cmjd95.dto.query_interface.ItemDataInterface;
import lk.ijse.cmjd95.dto.query_interface.OrderDataCustomerDisplayInterface;
import lk.ijse.cmjd95.dto.query_interface.PayoutDataInterface;
import lk.ijse.cmjd95.dto.request.ItemRequestDto;
import lk.ijse.cmjd95.dto.request.OrderRequestDto;
import lk.ijse.cmjd95.dto.request.PayoutRequestDto;
import lk.ijse.cmjd95.dto.response.ItemResponseDto;
import lk.ijse.cmjd95.dto.response.OrderResponseCustomerDisplayDto;
import lk.ijse.cmjd95.dto.response.PayoutResponseDto;
import lk.ijse.cmjd95.entity.Item;
import lk.ijse.cmjd95.entity.Order;
import lk.ijse.cmjd95.entity.Payout;
import lk.ijse.cmjd95.entity.PayoutItem;
import org.springframework.data.domain.Page;

import java.util.List;

@org.mapstruct.Mapper(componentModel = "spring")
public interface Mapper {
    Item toItem(ItemRequestDto dto);

    ItemResponseDto toItemResponseDto(Item item);

    List<ItemResponseDto> toItemResponseDto(Page<ItemDataInterface> data);

    Order toOrder(OrderRequestDto dto);

    OrderResponseCustomerDisplayDto toOrderResponseCustomerDisplayDto(Order order);

    List<OrderResponseCustomerDisplayDto> toOrderResponseCustomerDisplayDto(Page<OrderDataCustomerDisplayInterface> data);

    Payout toPayout(PayoutRequestDto dto);

    PayoutResponseDto toPayoutResponseDto(Payout payout);

    List<PayoutResponseDto> toPayoutResponseDto(Page<PayoutDataInterface> data);

    PayoutItem[] toPayoutItems(List<PayoutItem> payoutItemList);

}
