package mk.finki.postcard.model;


import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="address")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class Address {
    @Id
    private String id;
    @Column(name="user_id")
    private String userId;
    private String street;
    private String city;
    private String country;
    @Column(name="postal_code")
    private Integer postalCode;
}
