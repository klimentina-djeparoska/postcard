package mk.finki.postcard.model;


import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "orderitem")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class OrderOnline {

    @Id
    private String id;
    @Column(name = "user_id")
    private String userId;
    @Column(name = "postcard_id")
    private String postcardId;
    private String street;
    private String city;
    private String country;
    @Column(name = "postal_code")
    private  int postalCode;
    private double price;
    private String status; // order received, made, send, delivered
}
