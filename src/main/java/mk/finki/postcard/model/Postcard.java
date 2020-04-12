package mk.finki.postcard.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="postcard")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class Postcard {

    @Id
    private String id;
    @Column(name = "user_id")
    private String userId;
    private String type;
    private String message;

}
