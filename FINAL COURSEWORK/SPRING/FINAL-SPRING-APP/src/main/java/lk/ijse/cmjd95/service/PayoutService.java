package lk.ijse.cmjd95.service;

import lk.ijse.cmjd95.dto.paginate.PaginatedPayoutResponseDto;
import lk.ijse.cmjd95.dto.request.PayoutRequestDto;

public interface PayoutService {
    String savePayout(PayoutRequestDto payoutRequestDto, String token);
    String updatePayout(PayoutRequestDto payoutRequestDto, String id,String token);
    PaginatedPayoutResponseDto getAllPayoutsByVendorEmail (String vendorEmail, int page, int pageSize, String token);


}
