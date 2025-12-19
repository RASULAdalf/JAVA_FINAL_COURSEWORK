package lk.ijse.cmjd95.service.impl;

import lk.ijse.cmjd95.dto.paginate.PaginatedPayoutResponseDto;
import lk.ijse.cmjd95.dto.request.PayoutRequestDto;
import lk.ijse.cmjd95.entity.Payout;
import lk.ijse.cmjd95.entity.PayoutItem;
import lk.ijse.cmjd95.repo.PayoutRepo;
import lk.ijse.cmjd95.security.TokenValidator;
import lk.ijse.cmjd95.service.PayoutService;
import lk.ijse.cmjd95.util.mapper.Mapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service

public class PayoutServiceImpl implements PayoutService {

    private final Mapper mapper;
    private final PayoutRepo payoutRepo;

    public PayoutServiceImpl(Mapper mapper, PayoutRepo payoutRepo) {
        this.mapper = mapper;
        this.payoutRepo = payoutRepo;
    }

    @Override
    public String savePayout(PayoutRequestDto payoutRequestDto, String token) {
        if (!TokenValidator.validateToken(token)) {
            return "Invalid Token!";
        }
        List<Payout> payoutsAllByVendorEmail = payoutRepo.getPayoutsAllByVendorEmail(payoutRequestDto.getVendorEmail());
        for (Payout payout : payoutsAllByVendorEmail){
            for (PayoutItem payoutItem:payout.getPayoutItems()){
                for (PayoutItem requestPayoutItem:payoutRequestDto.getPayoutItems()){
                    if (Objects.equals(payoutItem.getItemCode(), requestPayoutItem.getItemCode())){
                        requestPayoutItem.setSoldCount(requestPayoutItem.getSoldCount() - payoutItem.getSoldCount());
                    }
                }
            }
        }
        return this.payoutRepo.save(mapper.toPayout(payoutRequestDto)).getPayoutId();
    }

    @Override
    public String updatePayout(PayoutRequestDto payoutRequestDto, String id, String token) {
        if (!TokenValidator.validateToken(token)) {
            return "Invalid Token!";
        }
        Optional<Payout> byId = payoutRepo.findById(id);
        if (byId.isPresent()){
            Payout payout = mapper.toPayout(payoutRequestDto);
            payout.setPayoutId(byId.get().getPayoutId());
            return payoutRepo.save(payout).getPayoutId();
        }
        return null;
    }

    @Override
    public PaginatedPayoutResponseDto getAllPayoutsByVendorEmail(String vendorEmail, int page, int pageSize, String token) {
        if (!TokenValidator.validateToken(token)) {
            return null;
        }
        return new PaginatedPayoutResponseDto(mapper.toPayoutResponseDto(payoutRepo.getPayoutsByVendorEmail(vendorEmail, PageRequest.of(page,pageSize))),payoutRepo.getPayoutsCountByVendorEmail(vendorEmail));
    }
}
