package mk.finki.postcard.web.rest;


import mk.finki.postcard.model.Address;
import mk.finki.postcard.service.AddressService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api/address")
public class AddressApi {

    private final AddressService addressService;

    public AddressApi(AddressService addressService) {
        this.addressService = addressService;
    }

    @PostMapping(path = "/save")
    public Address saveAddress(@RequestBody  Address address,
                               HttpServletResponse response) {

        Address address1 = this.addressService.saveAddress(address.getId(), address.getUserId(), address.getStreet(),
                address.getCity(), address.getCountry(), address.getPostalCode());
        response.setHeader("Location", "/api/address/save");

        return address1;
    }

    @GetMapping("/all")
    public List<Address> getAddressesForUser(@RequestParam String userId) {
        return this.addressService.getAllAddressesForUser(userId);
    }

    @GetMapping
    public Address getAddress(@RequestParam String id) {
        return this.addressService.getAddress(id);
    }
}
