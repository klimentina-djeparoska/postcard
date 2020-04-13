package mk.finki.postcard.service.impl;

import mk.finki.postcard.model.Address;
import mk.finki.postcard.model.exceptions.InvalidAddressNotFoundException;
import mk.finki.postcard.repository.AddressRepository;
import mk.finki.postcard.service.AddressService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;

    public AddressServiceImpl(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @Override
    public Address saveAddress(String id, String userId, String street, String city, String country, Integer postalCode) {

        if (id == null || userId == null) {
            throw new IllegalArgumentException();
        }

        Address address = new Address(id, userId, street, city, country, postalCode);

        return this.addressRepository.save(address);
    }

    @Override
    public Address updateAddress(String id, String userId, String street, String city, String country, Integer postalCode) {

        if (id == null || userId == null) {
            throw new IllegalArgumentException();
        }

        Address address = new Address(id, userId, street, city, country, postalCode);

        return this.addressRepository.save(address);
    }

    @Override
    public Address getAddress(String id) {
        if ( id == null ) {
            throw new IllegalArgumentException();
        }

        return this.addressRepository.findById(id).orElseThrow(InvalidAddressNotFoundException::new);
    }

    @Override
    public void deleteAddress(String id) {
        if (id == null) {
            throw new IllegalArgumentException();
        }

        this.addressRepository.deleteById(id);
    }

    @Override
    public List<Address> getAllAddressesForUser(String userId) {
        if (userId == null) {
            throw new IllegalArgumentException();
        }

        return this.addressRepository.findAllByUserId(userId);
    }
}
